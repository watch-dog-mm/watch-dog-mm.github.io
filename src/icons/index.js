import L from "leaflet";
import person from "./person.svg";

import bearer from "./bearer.svg";
import redcross from "./redcross.svg";

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

export const RedCrossIcon = new L.Icon({
  iconUrl: redcross,
  iconRetinaUrl: redcross,
  iconAnchor: null,
  popupAnchor: [-3, -20],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(25, 40),
  className: "leaflet-div-rescue",
});

const sizeMap = {
  "10-20": [15, 15],
  "20-50": [20, 20],
  "50-100": [25, 25],
  "100-200": [30, 30],
  "200-above": [35, 35],
};

export const UnitMarkerSize = (unitSize) => sizeMap[unitSize];
