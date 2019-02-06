import React, { Component } from "react";
import TopNav from "./TopNav/TopNav";
import SideNav from "./SideNav/SideNav";

class Navigation extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      showSearch: false
    };
  }

  toggleNav = () => {
    this.setState(prevState => {
      return {
        isOpen: !prevState.isOpen
      };
    });
  };

  toggleSearch = () => {
    this.setState(prevState => {
      return {
        showSearch: !prevState.showSearch
      };
    });
  };

  render() {
    return (
      <div>
        <TopNav
          hideTopNav={this.props.hideTopNav}
          showSearch={this.state.showSearch}
          toggleSearch={this.toggleSearch}
          toggleNav={this.toggleNav}
        />
        <SideNav isOpen={this.state.isOpen} />
      </div>
    );
  }
}

export default Navigation;
