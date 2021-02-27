import { useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";
const SideNav = () => {
  const [toggleClass, setToggle] = useState("close-nav");
  return (
    <>
      <div id="mySidenav" className={`sidenav ${toggleClass}`}>
        <div
          className="closebtn"
          onClick={() => {
            setToggle("close-nav");
          }}
        >
          &times;
        </div>
        <Link to="/home">Home</Link>
      </div>

      <div
        style={{
          fontSize: "20px",
          cursor: "pointer",
          background: "#6f6f6f",
          color: "white",
          position: "fixed",
          zIndex: "1000",
          width: "100%",
        }}
        onClick={() => {
          setToggle("open-nav");
        }}
      >
        &#9776; Myanmar Map Live
      </div>
    </>
  );
};

export default SideNav;
