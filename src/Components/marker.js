import { Marker, Popup } from "react-leaflet";
import { PersonIcon, PoliceIcon, BearerIcon } from "../icons/index";

export const PersonMarker = ({ position, message }) => {
  return (
    <Marker position={position} icon={PersonIcon}>
      <Popup>{message}</Popup>
    </Marker>
  );
};

const PoliceMarker = ({ position, message }) => {
  return (
    <Marker position={position} icon={PoliceIcon}>
      <Popup>{message}</Popup>
    </Marker>
  );
};
const BearerMarker = ({ position, message }) => {
  return (
    <Marker position={position} icon={BearerIcon}>
      <Popup>{message}</Popup>
    </Marker>
  );
};

const MapMarker = ({ type, position, message }) => {
  console.log(type);
  return (
    <>
      {type === "pol" && (
        <PoliceMarker
          position={[position.lat, position.lng]}
          message={message}
        />
      )}
      {type === "bearer" && (
        <BearerMarker
          position={[position.lat, position.lng]}
          message={message}
        />
      )}
    </>
  );
};

export default MapMarker;
