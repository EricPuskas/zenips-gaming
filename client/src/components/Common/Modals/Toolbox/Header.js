import React from "react";

const Header = ({ header, onCloseModal }) => {
  return (
    <div className="modal-header">
      <h4 className="modal-title modal-title-center">
        {header}
        <div>
          <small>Shortcut: Alt + Q</small>
        </div>
      </h4>
      <button type="button" className="close" onClick={() => onCloseModal()}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

export default Header;
