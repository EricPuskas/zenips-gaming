import React from "react";

const Body = ({ onCloseModal, submitForm, avatar, changeInput }) => {
  return (
    <form onSubmit={submitForm}>
      <hr />
      <div className="modal-body avatar-modal">
        <img src={avatar} alt="user avatar" className="profile-avatar" />
        <p>Recommended: Use a square image, eg: 200x200. </p>
        <div style={{ textAlign: "end", padding: "0 0 1.5rem 0" }}>
          <input
            type="file"
            id="avatar"
            onChange={e => changeInput(e)}
            name="avatar"
          />
        </div>
      </div>
      <div className="modal-footer-bio text-center">
        <button className="btn btn-green-c">
          <i className="fas fa-check-circle" /> Save
        </button>
        <button
          className="btn btn-red-c"
          type="button"
          onClick={() => onCloseModal()}
        >
          <i className="fas fa-times-circle" /> Cancel
        </button>
      </div>
    </form>
  );
};

export default Body;
