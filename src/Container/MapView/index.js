import { MapContainer, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";
import { ChangeView } from "../../ChangeView";
import MapMarker, { PersonMarker } from "../../Components/MapMarker";
import firebase from "firebase";
import { config, database } from "../../config";
import {
  FirebaseDatabaseNode,
  FirebaseDatabaseProvider,
} from "@react-firebase/database";
import Legend from "../../Legend";
import Model from "../../Components/Modal";
import { AddMarkerToClick } from "../../MarkerOnclick";
import { nanoid } from "nanoid";

function MapView() {
  const [latlng, setlatlng] = useState({ lat: 16.8409, lng: 96.1735 });
  const [modelVisible, setModelVisible] = useState(false);

  const [selectedLatLng, setSelectedLatLng] = useState({
    lat: 16.8409,
    lng: 96.1735,
  });
  const [userPositon, setUserPosition] = useState({
    lat: 16.8409,
    lng: 96.1735,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setlatlng({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      setUserPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  return (
    <>
      <Model
        visible={modelVisible}
        onOkClick={(e) => {
          database.ref("locations/" + nanoid()).set({
            created_at: Date.now(),
            id: nanoid(),
            message: e.message,
            position: {
              lat: selectedLatLng.lat,
              lng: selectedLatLng.lng,
            },
            type: e.objType,
          });
          setModelVisible(false);
        }}
        onCancelClick={() => {
          setModelVisible(false);
        }}
      ></Model>
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
          <AddMarkerToClick
            onMapClick={(e) => {
              setSelectedLatLng({ lat: e.lat, lng: e.lng });

              setModelVisible(true);
            }}
          />
          <ChangeView center={[latlng.lat, latlng.lng]} zoom={13} />

          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <PersonMarker
            position={[userPositon.lat, userPositon.lng]}
            message="This is your current location"
          />
          <FirebaseDatabaseNode path="locations">
            {(d) => {
              return (
                <>
                  {!d.isLoading &&
                    d.value &&
                    Object.keys(d.value).map((i) => {
                      return <MapMarker key={i} {...d.value[i]} />;
                    })}
                </>
              );
            }}
          </FirebaseDatabaseNode>
          <Legend></Legend>
        </MapContainer>
      </FirebaseDatabaseProvider>
    </>
  );
}

export default MapView;
