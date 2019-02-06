import React from "react";
import { MDBCardTitle, MDBContainer } from "mdbreact";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "mdbreact";
import Tilt from "react-tilt";
import { Link } from "react-router-dom";
const UserInfo = ({ user, onLogoutClick, toggleSidenavMobile }) => {
  return (
    <MDBContainer style={{ color: "black", textAlign: "center" }}>
      <div className="row">
        <div className="col">
          <div className="showForMobile">
            <Dropdown>
              <DropdownToggle caret nav>
                <img
                  src={user.avatar}
                  alt="User avatar"
                  className="avatar-sidenav-m"
                />
                <span style={{ paddingLeft: "5px" }}>{`${user.firstName} ${
                  user.lastName
                }`}</span>
              </DropdownToggle>
              <button
                style={{
                  display: "inline-block",
                  fontSize: "0.9rem",
                  padding: "5px 15px"
                }}
                className="btn btn-red-c btn-role"
              >
                {user.role}
              </button>
              <DropdownMenu className="dropdown-default dropdown-blue" right>
                <Link
                  className="dropdown-item"
                  to={`/dashboard/team/${user.username}`}
                  onClick={() => toggleSidenavMobile()}
                >
                  <i className="fas fa-user-circle" /> Profile
                </Link>
                <DropdownItem href="#!">
                  <i className="fas fa-cogs" /> Settings
                </DropdownItem>
                <DropdownItem onClick={onLogoutClick} href="#!">
                  <i className="fas fa-sign-out-alt" /> Log out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="hideForMobile">
          <MDBCardTitle className="text-center">
            <Tilt className="Tilt" options={{ max: 50 }}>
              <div className="Tilt-inner">
                <img
                  src={user.avatar}
                  alt="user avatar"
                  className="sidenav-avatar"
                />
              </div>
            </Tilt>
          </MDBCardTitle>
          <div className="text-center username-box">
            <span className="username">{`${user.firstName} ${
              user.lastName
            }`}</span>
          </div>
          <div className="flex-row">
            <button className="btn btn-block btn-red-c">{user.role}</button>
          </div>
        </div>
      </div>
    </MDBContainer>
  );
};

export default UserInfo;
