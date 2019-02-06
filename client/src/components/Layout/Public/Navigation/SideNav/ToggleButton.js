import React from "react";
import "./ToggleButton.css";

const ToggleButton = ({ toggleNav }) => {
  return (
    <button className="toggle-btn" onClick={() => toggleNav()}>
      <div className="toggle-btn-line" />
      <div className="toggle-btn-line" />
      <div className="toggle-btn-line" />
    </button>
  );
};

export default ToggleButton;
