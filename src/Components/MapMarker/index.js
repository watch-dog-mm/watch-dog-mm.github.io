import { Marker, Popup } from "react-leaflet";
import { PersonIcon, PoliceIcon, BearerIcon } from "../../icons/index";
import "./index.css";
export const PersonMarker = ({ position, message }) => (
  <Marker position={position} icon={PersonIcon}>
    <Popup>{message}</Popup>
  </Marker>
);

const PoliceMarker = ({ position, message }) => (
  <Marker position={position} icon={PoliceIcon}>
    <Popup>{message}</Popup>
  </Marker>
);
const BearerMarker = ({ position, message }) => (
  <Marker position={position} icon={BearerIcon}>
    <Popup>{message}</Popup>
  </Marker>
);

const MapMarker = ({ type, position, message }) => (
  <>
    {type === "pol" && (
      <PoliceMarker position={[position.lat, position.lng]} message={message} />
    )}
    {type === "bearer" && (
      <BearerMarker position={[position.lat, position.lng]} message={message} />
    )}
  </>
);

export default MapMarker;
