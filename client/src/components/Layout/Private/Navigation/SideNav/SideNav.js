import React, { Component } from "react";
import UserInfo from "./UserInfo";
import Menu from "./Menu";
import "./SideNav.css";

class SideNav extends Component {
  render() {
    const {
      inbox,
      archive,
      status,
      user,
      toggleSidenavMobile,
      onLogoutClick
    } = this.props;
    return (
      <nav id="sidebar" className={status}>
        <UserInfo
          user={user}
          onLogoutClick={onLogoutClick}
          toggleSidenavMobile={toggleSidenavMobile}
        />
        <Menu
          inbox={inbox}
          archive={archive}
          toggleSidenavMobile={toggleSidenavMobile}
        />
      </nav>
    );
  }
}

export default SideNav;
