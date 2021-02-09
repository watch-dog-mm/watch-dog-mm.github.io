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
import { getCookie, setCookie } from "../../utils/cookie-utils";

function MapView() {
  const [latlng, setlatlng] = useState({ lat: 16.8409, lng: 96.1735 });
  const [modelVisible, setModelVisible] = useState(false);
  // const [selectedMarkerId, setSelectedMarkerId] = useState("");

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
            unitSize: e.unitSize,
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
          <option value="24.1821769|96.329305">ကသာ(Kathar)</option>
          <option value="22.1097701|95.1243952">မုံရွာ(Monywa)</option>
          <option value="18.8239172|95.2247068">ပြည်(Pyay)</option>
          <option value="17.3050582|96.4407641">ပဲခူး(Bago)</option>
          <option value="16.9347022|97.3326008">(သထုံ)Tha Htone </option>
          <option value="16.4537233|97.5891465">(မော်လမြိုင်)MawlaMyine</option>
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
              if (getCookie("MASTER_LOGIN") === "exists") {
                setSelectedLatLng({ lat: e.lat, lng: e.lng });

                setModelVisible(true);
              } else {
                const password = prompt("Please enter master password:", "");
                if (btoa(password) === "djNuZDN0dDQ=") {
                  setSelectedLatLng({ lat: e.lat, lng: e.lng });

                  setModelVisible(true);
                  setCookie("MASTER_LOGIN", "exists", 1);
                }
              }
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
                      return (
                        <MapMarker
                          key={i}
                          {...d.value[i]}
                          fbKey={i}
                          onMarkerClick={(e, fbKey, id) => {
                            if (getCookie("MASTER_LOGIN") === "exists") {
                              const result = window.confirm("Want to delete?");
                              if (result) {
                                database.ref("locations/" + fbKey).remove();
                              }
                            } else {
                              const password = prompt(
                                "Please enter master password:"
                              );
                              if (btoa(password) === "djNuZDN0dDQ=") {
                                const result = window.confirm(
                                  "Want to delete?"
                                );
                                if (result) {
                                  database.ref("locations/" + fbKey).remove();
                                }
                              }
                            }
                          }}
                        />
                      );
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
