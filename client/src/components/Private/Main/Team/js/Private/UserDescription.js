import React from "react";

const UserDescription = ({
  member,
  submitForm,
  changeInput,
  error,
  loadModal
}) => {
  let MODAL_PROPS = {
    member,
    width: "45%",
    submitForm,
    changeInput,
    error
  };
  return (
    <div className="profile-bio user-description">
      <div className="profile-bio-controls">
        <button
          className="btn btn-yellow-c"
          onClick={() => loadModal("DESCRIPTION_MODAL", MODAL_PROPS)}
        >
          <i className="fas fa-edit" />
        </button>
      </div>
      <div className="text-center">
        <h1>Description</h1>
      </div>
      <p>{member.description}</p>
    </div>
  );
};

export default UserDescription;
