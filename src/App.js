import "./App.css";
import { MapContainer, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";
import { ChangeView } from "./ChangeView";
import MapMarker, { PersonMarker } from "./Components/marker";
import firebase from "firebase";
import { config } from "./config";
import {
  FirebaseDatabaseNode,
  FirebaseDatabaseProvider,
} from "@react-firebase/database";

function App() {
  const [latlng, setlatlng] = useState({ lat: 16.8409, lng: 96.1735 });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setlatlng({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  return (
    <>
      <FirebaseDatabaseProvider firebase={firebase} {...config}>
        <select
          onChange={(e) => {
            setlatlng({
              lat: parseFloat(e.target.value.split("|")[0]),
              lng: parseFloat(e.target.value.split("|")[1]),
            });
          }}
        >
          <option value="16.8409|96.1735" selected>
            Yangon
          </option>
          <option value="21.9588|96.0891">Mandalay</option>
          <option value="19.7633|96.0785">Naypyi Daw</option>
        </select>
        <MapContainer
          style={{ height: `100vh` }}
          center={[latlng.lat, latlng.lng]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <ChangeView center={[latlng.lat, latlng.lng]} zoom={13} />
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <PersonMarker
            position={[latlng.lat, latlng.lng]}
            message="This is your current location"
          />
          <FirebaseDatabaseNode path="locations">
            {(d) => (
              <>
                {!d.isLoading &&
                  Array.isArray(d.value) &&
                  d.value.map((item) => <MapMarker key={item.id} {...item} />)}
              </>
            )}
          </FirebaseDatabaseNode>
        </MapContainer>
      </FirebaseDatabaseProvider>
    </>
  );
}

export default App;
