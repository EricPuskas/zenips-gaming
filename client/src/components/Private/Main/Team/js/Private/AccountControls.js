import React from "react";

const AccountControls = ({
  username,
  id,
  avatar,
  email,
  error,
  submitForm,
  changeInput,
  loadModal
}) => {
  let AVATAR_MODAL_PROPS = {
    username,
    id,
    avatar,
    width: "20%",
    left: "40%",
    submitForm,
    changeInput,
    error
  };

  let DEL_ACC_MODAL_PROPS = {
    width: "40%",
    left: "30%",
    username,
    email,
    id
  };

  let CHANGE_PW_MODAL_PROPS = {
    width: "35%",
    left: "35%",
    email
  };

  return (
    <div className="controls-menu">
      <button
        className="btn btn-block btn-blue-l controls-btn"
        onClick={() => loadModal("CHANGE_PW_MODAL", CHANGE_PW_MODAL_PROPS)}
      >
        Reset Password
      </button>
      <button
        onClick={() => loadModal("AVATAR_MODAL", AVATAR_MODAL_PROPS)}
        className="btn btn-block btn-green-c controls-btn"
      >
        Change Avatar
      </button>
      <button
        className="btn btn-block btn-red-c controls-btn"
        onClick={() => loadModal("DELETE_ACCOUNT_MODAL", DEL_ACC_MODAL_PROPS)}
      >
        Delete Account
      </button>
    </div>
  );
};

export default AccountControls;
