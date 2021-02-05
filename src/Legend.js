import { useMap } from "react-leaflet";
import L from "leaflet";
import bearer from "./icons/bearer.svg";
import person from "./icons/person.svg";
import { useEffect } from "react";

const Legend = () => {
  const map = useMap();

  useEffect(() => {
    const legend = L.control({ position: "bottomright" });

    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "info legend");
      div.style.background = "#383838";
      div.style.width = "200px";
      div.style.padding = "20px 10px";
      div.style.display = "flex";
      div.style.flexDirection = "column";
      div.style.borderRadius = "20px";
      div.style.color = "white";
      div.style.fontSize = "15px";
      div.style.marginBottom = "50px";

      let labels = [];

      labels.push(
        `<div style='display:flex;'><div class='circle' style='width:20px;height:20px;margin-left: 10px;
          margin-top: 5px;'></div> <p style="margin:0;line-height: 10px;
          ">ရဲ/လုံထိမ်း </p></div>`
      );
      labels.push(
        `<div style='display:flex;'><img class='legend-marker' src='${bearer}' style='width:25px;height:25px;'/><p style="margin:0;line-height: 10px;    line-height: 16px;
        margin-left: 6px;
            ">အတားအဆီးများ </p></div>`
      );
      labels.push(
        `<div style='display:flex;'><img class='legend-marker' src='${person}' style='width:25px;height:25px;'/><p style="margin:0;line-height: 10px;    line-height: 16px;
        margin-left: 6px;
            ">သင် လက်ရှိရောက်နေတဲ့ နေရာ</p></div>`
      );

      div.innerHTML = labels.join("<br>");
      return div;
    };

    legend.addTo(map);
  }, [map]);

  return null;
};

export default Legend;
