import { useMapEvents } from "react-leaflet";

export function AddMarkerToClick({ onMapClick }) {
  useMapEvents({
    click(e) {
      //   onMapClick(e.latlng);
    },
    contextmenu(e) {
      onMapClick(e.latlng);
    },
  });

  return <></>;
}
