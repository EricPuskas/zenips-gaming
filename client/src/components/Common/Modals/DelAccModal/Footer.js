import React from "react";

const Footer = ({ id, history, confirmation, deleteUser, onCloseModal }) => {
  return (
    <div className="modal-footer-bio text-center">
      <button
        disabled={!confirmation}
        className="btn btn-red-c"
        onClick={() => deleteUser(id, history)}
      >
        <i className="fas fa-check-circle" /> I understand. Delete this account.
      </button>
      <button className="btn btn-green-c" onClick={() => onCloseModal()}>
        <i className="fas fa-times-circle" /> I changed my mind.
      </button>
    </div>
  );
};

export default Footer;
