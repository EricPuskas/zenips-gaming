import React, { Component } from "react";
import Brand from "./Brand";
import NavRight from "./NavRight";
import { Navbar, NavbarNav, NavItem, NavbarToggler, Collapse } from "mdbreact";
import { Link } from "react-router-dom";
import "./TopNav.css";

class TopNav extends Component {
  render() {
    const {
      user,
      inbox,
      preview,
      toggleCollapse,
      isOpen,
      toggleSidenav,
      onLogoutClick,
      loadModal
    } = this.props;
    return (
      <div id="content">
        <Navbar dark expand="md">
          <Brand />
          <NavbarToggler onClick={toggleCollapse} />
          <Link to="/dashboard/inbox" className="msgMobile">
            <i
              className="far fa-envelope fa-lg"
              style={{ padding: "6px 6px", color: "#fff" }}
            />
            <span className="badge badge-light"> {inbox}</span>
          </Link>
          <NavbarNav left>
            <NavItem active>
              <button
                type="button"
                id="sidebarCollapse"
                className="btn btn-toggle"
                onClick={toggleSidenav}
                style={{ padding: "5px 10px" }}
              >
                <i className="fas fa-bars" />
              </button>
            </NavItem>
          </NavbarNav>
          <Collapse id="navbarCollapse3" isOpen={isOpen} navbar>
            <NavRight
              loadModal={loadModal}
              preview={preview}
              inbox={inbox}
              user={user}
              onLogoutClick={onLogoutClick}
            />
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default TopNav;
