import React from "react";

const Body = props => {
  return (
    <div className="modal-body" style={{ textAlign: "start" }}>
      {props.children}
    </div>
  );
};

export default Body;
