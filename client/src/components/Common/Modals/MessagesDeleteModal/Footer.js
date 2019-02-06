import React from "react";

const Footer = props => {
  return (
    <div className="modal-footer text-center" style={{ paddingBottom: "1rem" }}>
      {props.children}
    </div>
  );
};

export default Footer;
