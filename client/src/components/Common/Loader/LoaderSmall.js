import React from "react";
import spinner from "../../../assets/img/loader.svg";

export default ({ position, left, top, right, marginTop }) => {
  return (
    <div
      className="spinner-loader-infinite"
      style={{ position, left, top, right, marginTop }}
    >
      <img src={spinner} alt="Loading..." />
    </div>
  );
};
