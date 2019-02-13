import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import TopNav from "./TopNav/TopNav";
import SideNav from "./SideNav/SideNav";

class Navigation extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      showSearch: false,
      search: ""
    };
  }

  toggleNav = () => {
    this.setState(prevState => {
      return {
        isOpen: !prevState.isOpen
      };
    });
  };

  escapeRegex = text => {
    return text.replace(/[\s]/g, "+");
  };

  onSearchChange = event => {
    let search = event.target.value;
    this.setState({ search });
  };

  toggleSearch = () => {
    if (this.state.search !== "") {
      let search_query = this.escapeRegex(this.state.search);
      this.props.history.push(`/articles/results?search_query=${search_query}`);
    } else {
      this.setState(prevState => {
        return {
          showSearch: !prevState.showSearch
        };
      });
    }
  };

  render() {
    return (
      <div>
        <TopNav
          hideTopNav={this.props.hideTopNav}
          showSearch={this.state.showSearch}
          toggleSearch={this.toggleSearch}
          toggleNav={this.toggleNav}
          onSearchChange={this.onSearchChange}
        />
        <SideNav toggleNav={this.toggleNav} isOpen={this.state.isOpen} />
      </div>
    );
  }
}

export default withRouter(Navigation);
