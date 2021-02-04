import logo from "./logo.svg";
import "./App.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useEffect, useState } from "react";
import { ChangeView } from "./ChangeView";

function App() {
  const [latlng, setlatlng] = useState({ lat: 21.9162, lng: 95.956 });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setlatlng({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, [latlng]);

  return (
    <>
      <select
        onChange={(e) => {
          setlatlng({
            lat: parseFloat(e.target.value.split("|")[0]),
            lng: parseFloat(e.target.value.split("|")[1]),
          });
        }}
      >
        <option value="16.8409|96.1735">Yangon</option>
        <option value="21.9588|96.0891" selected>
          Mandalay
        </option>
        <option value="19.7633|96.0785">Naypyi Daw</option>
      </select>
      <MapContainer
        style={{ height: `100vh` }}
        center={[latlng.lat, latlng.lng]}
        zoom={10}
        scrollWheelZoom={true}
      >
        <ChangeView center={[latlng.lat, latlng.lng]} zoom={10} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latlng.lat, latlng.lng]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
}

export default App;
