import { useState } from "react";
import "./index.css";

const Model = ({ visible, onOkClick, onCancelClick }) => {
  const [objType, setObjType] = useState("pol");
  const [message, setMessage] = useState("");

  return (
    <div id="myModal" className={`modal ${visible ? "visible" : "hide"}`}>
      <div className="modal-content">
        <span className="close" onClick={() => onCancelClick()}>
          &times;
        </span>
        <br />
        <div className="flex">
          <p>တွေ့ရှိသော အရာ</p>
          <select
            onChange={(e) => {
              setObjType(e.target.value);
            }}
          >
            <option value="pol" selected>
              ရဲ / လုံထိန်း
            </option>
            <option value="bearer">အတားအဆီး</option>
          </select>
        </div>
        <div className="flex">
          <p>ပြောလိုသောအရာ</p>
          <textarea
            cols="20"
            rows="10"
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <div className="flex">
          <button
            onClick={() => {
              onOkClick({ objType, message });
            }}
          >
            Report
          </button>
        </div>
        <div className="flex">
          <button onClick={() => onCancelClick()}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Model;
