import React from "react";
import spinner from "../../../assets/img/rolling.svg";

export default ({ msg, margin, textColor }) => {
  let color;
  textColor ? (color = textColor) : (color = "#ff8941");
  return (
    <div className="spinner-loader" style={{ margin }}>
      <img src={spinner} alt="Loading..." />
      <h2 style={{ color }}>{msg}</h2>
    </div>
  );
};
