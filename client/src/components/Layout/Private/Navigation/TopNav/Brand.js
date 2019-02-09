import React from "react";
import { NavbarBrand } from "mdbreact";
import { Link } from "react-router-dom";
import Logo from "../../../../../assets/img/admin_logo.png";

const Brand = () => {
  return (
    <div>
      <NavbarBrand>
        <strong className="white-text">
          <div className="logo-container">
            <Link to="/">
              <img src={Logo} className="logo" alt="Logo" />
            </Link>
          </div>
        </strong>
      </NavbarBrand>
    </div>
  );
};

export default Brand;
