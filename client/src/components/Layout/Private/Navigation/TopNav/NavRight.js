import React from "react";
import MessageBox from "./MessageBox";
import { Link } from "react-router-dom";
import Tilt from "react-tilt";
import {
  NavbarNav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "mdbreact";

const NavRight = ({ loadModal, preview, user, onLogoutClick, inbox }) => {
  return (
    <NavbarNav right>
      <NavItem>
        <Dropdown>
          <DropdownToggle nav>
            <i
              className="far fa-envelope fa-lg"
              style={{ padding: "6px 6px" }}
            />
            <span className="badge badge-light"> {inbox}</span>
          </DropdownToggle>
          <DropdownMenu
            className="dropdown-default message-box-container"
            right
          >
            <DropdownItem>
              <MessageBox
                loadModal={loadModal}
                preview={preview}
                inbox={inbox}
              />
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavItem>
      <NavItem>
        <Dropdown>
          <DropdownToggle caret nav>
            <img
              src={user.avatar}
              alt="User avatar"
              className="avatar-top-nav"
            />
          </DropdownToggle>
          <DropdownMenu className="dropdown-default dropdown-blue" right>
            <div className="userinfo-dropdown">
              <Tilt className="Tilt" options={{ max: 50 }}>
                <img
                  src={user.avatar}
                  alt="User avatar"
                  className="avatar-dropdown"
                />
              </Tilt>
              <div className="profile-dropdown">
                <h6>{user.username}</h6>
                <h6>{user.email}</h6>
                <div className="flex-row">
                  <button className="btn btn-block btn-red-c">
                    {user.role}
                  </button>
                </div>
              </div>
            </div>
            <Link
              className="dropdown-item"
              to={`/dashboard/team/${user.username}`}
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
      </NavItem>
    </NavbarNav>
  );
};

export default NavRight;
