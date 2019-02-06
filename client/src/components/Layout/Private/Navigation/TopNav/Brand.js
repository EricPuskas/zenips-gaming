import React from "react";
import { NavbarBrand } from "mdbreact";
import Logo from "../../../../../assets/img/admin_logo.png";

const Brand = () => {
  return (
    <div>
      <NavbarBrand>
        <strong className="white-text">
          <div className="logo-container">
            <img src={Logo} className="logo" alt="Logo" />
          </div>
        </strong>
      </NavbarBrand>
    </div>
  );
};

export default Brand;
