import React from "react";

const Header = ({ header, onCloseModal }) => {
  return (
    <div className="modal-header">
      <h4 className="modal-title modal-title-center">
        {header}
        <div>
          <small>Shortcut: Shift + T</small>
        </div>
      </h4>
      <button type="button" className="close" onClick={() => onCloseModal()}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

export default Header;
