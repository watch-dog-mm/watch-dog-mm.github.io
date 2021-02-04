import L from "leaflet";
import person from "./person.svg";
import police from "./police.svg";
import bearer from "./bearer.svg";

export const PersonIcon = new L.Icon({
  iconUrl: person,
  iconRetinaUrl: person,
  iconAnchor: null,
  popupAnchor: [-3, -20],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(25, 30),
  className: "leaflet-div-personicon",
});

export const PoliceIcon = new L.divIcon({
  iconUrl: police,
  iconRetinaUrl: police,
  iconAnchor: null,
  popupAnchor: [-3, -20],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(25, 25),
  className: "leaflet-div-police circle",
});

export const BearerIcon = new L.Icon({
  iconUrl: bearer,
  iconRetinaUrl: bearer,
  iconAnchor: null,
  popupAnchor: [-3, -20],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(25, 40),
  className: "leaflet-div-bearer",
});
