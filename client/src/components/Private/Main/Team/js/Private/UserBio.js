import React from "react";

const UserBio = ({ member, submitForm, changeInput, error, loadModal }) => {
  let MODAL_PROPS = {
    member,
    width: "45%",
    submitForm,
    changeInput,
    error
  };
  return (
    <div className="profile-bio">
      <div className="profile-bio-controls">
        <button
          className="btn btn-yellow-c"
          onClick={() => loadModal("BIO_MODAL", MODAL_PROPS)}
        >
          <i className="fas fa-edit" />
        </button>
      </div>
      <div className="text-center">
        <h1>Bio</h1>
      </div>
      <p>{member.bio.substr(0, 300)}...</p>
    </div>
  );
};

export default UserBio;
