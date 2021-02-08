import L from "leaflet";
import { Marker, Popup } from "react-leaflet";
import {
  PersonIcon,
  PoliceIcon,
  BearerIcon,
  MilitryIcon,
  UnitMarkerSize,
} from "../../icons/index";
import "./index.css";
export const PersonMarker = ({ position, message }) => (
  <Marker position={position} icon={PersonIcon}>
    <Popup on>{message}</Popup>
  </Marker>
);

const PoliceMarker = ({ id, position, message, unitSize, onMarkerClick }) => {
  const PoliceIcon = new L.divIcon({
    iconUrl: null,
    iconRetinaUrl: null,
    iconAnchor: null,

    popupAnchor: [-3, -20],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(...UnitMarkerSize(unitSize)),
    className: "leaflet-div-police blue-circle",
  });

  return (
    <Marker
      position={position}
      icon={PoliceIcon}
      // eventHandlers={{
      //   click: (e) => {
      //     onMarkerClick(e, id);
      //   },
      // }}
    >
      <Popup>{`${message}\n တပ်ဖွဲ့ အင်အား ${unitSize} ခန့်`}</Popup>
    </Marker>
  );
};
const BearerMarker = ({ id, position, message, onMarkerClick }) => (
  <Marker
    position={position}
    icon={BearerIcon}
    // eventHandlers={{
    //   click: (e) => {
    //     onMarkerClick(e, id);
    //   },
    // }}
  >
    {message && <Popup>{message}</Popup>}
  </Marker>
);
const MilitryMarker = ({ id, position, message, unitSize, onMarkerClick }) => {
  const MilitryIcon = new L.divIcon({
    iconUrl: null,
    iconRetinaUrl: null,
    iconAnchor: null,
    popupAnchor: [-3, -20],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(...UnitMarkerSize(unitSize)),
    className: "leaflet-div-militry red-circle",
  });
  return (
    <Marker
      position={position}
      icon={MilitryIcon}
      // eventHandlers={{
      //   click: (e) => {
      //     onMarkerClick && onMarkerClick(e, id);
      //   },
      // }}
    >
      <Popup>{`${message}\n တပ်ဖွဲ့ အင်အား ${unitSize} ခန့်`}</Popup>
    </Marker>
  );
};

const MapMarker = ({
  id,
  type,
  position,
  message,
  unitSize,
  onMarkerClick,
}) => {
  return (
    <>
      {type === "pol" && (
        <PoliceMarker
          position={[position.lat, position.lng]}
          message={message}
          unitSize={unitSize}
          onMarkerClick={onMarkerClick}
          id={id}
        />
      )}
      {type === "bearer" && (
        <BearerMarker
          position={[position.lat, position.lng]}
          message={message}
          onMarkerClick={onMarkerClick}
          id={id}
        />
      )}
      {type === "milt" && (
        <MilitryMarker
          position={[position.lat, position.lng]}
          message={message}
          unitSize={unitSize}
          onMarkerClick={onMarkerClick}
          id={id}
        />
      )}
    </>
  );
};

export default MapMarker;
