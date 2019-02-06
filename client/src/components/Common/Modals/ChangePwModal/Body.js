import React from "react";

const Body = ({ error }) => {
  return (
    <div className="modal-body">
      <hr />
      <div className="row">
        <div className="col-6 center-div">
          <div className="warning-message">{error && <p>{error.email}</p>}</div>
          <div />
        </div>
      </div>
    </div>
  );
};

export default Body;
