import React from "react";

const Header = ({ onCloseModal }) => {
  return (
    <div className="modal-header">
      <h4 className="modal-title modal-title-center del-acc-warning">
        Are you absolutely sure?
      </h4>
      <button type="button" className="close" onClick={() => onCloseModal()}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

export default Header;
