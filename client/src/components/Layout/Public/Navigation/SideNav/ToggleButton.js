import React from "react";
import "./ToggleButton.css";

const ToggleButton = ({ toggleNav }) => {
  return (
    <button
      className="toggle-btn"
      aria-label="toggle dropdown"
      onClick={() => toggleNav()}
    >
      <div className="toggle-btn-line" />
      <div className="toggle-btn-line" />
      <div className="toggle-btn-line" />
    </button>
  );
};

export default ToggleButton;
