import React from "react";

const Body = ({ changeInput, username, email }) => {
  return (
    <div className="modal-body">
      <hr />
      <div className="row">
        <div className="col-12">
          <div className="warning-message">
            <p>
              This action cannot be undone. This will permanently delete the
              account associated with{" "}
              <span className="del-acc-warning">{`${email}`}</span>
            </p>
          </div>
          <div>
            <p>
              Please type
              <span className="del-acc-warning">{` Delete ${username} `}</span>
              to confirm.
            </p>
          </div>
        </div>
        <div className="center-div">
          <div className="col-12">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                onChange={e => changeInput(e)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
