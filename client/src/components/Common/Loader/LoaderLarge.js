import React from "react";
import spinner from "../../../assets/img/spinner.svg";

export default ({ msg, margin }) => {
  return (
    <div className="spinner-loader" style={{ margin }}>
      <img src={spinner} alt="Loading..." />
      <h2>{msg}</h2>
    </div>
  );
};
