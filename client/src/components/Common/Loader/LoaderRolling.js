import React from "react";
import spinner from "../../../assets/img/rolling.svg";

export default ({ msg, margin }) => {
  return (
    <div className="spinner-loader" style={{ margin }}>
      <img src={spinner} alt="Loading..." />
      <h2 style={{ color: "#ff8941" }}>{msg}</h2>
    </div>
  );
};
