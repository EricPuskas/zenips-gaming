import React from "react";

const Footer = ({ submitForm, onCloseModal }) => {
  return (
    <div className="modal-footer-bio text-center">
      <button className="btn btn-green-c" onClick={e => submitForm(e)}>
        <i className="fas fa-check-circle" /> Save
      </button>
      <button className="btn btn-red-c" onClick={() => onCloseModal()}>
        <i className="fas fa-times-circle" /> Cancel
      </button>
    </div>
  );
};

export default Footer;
