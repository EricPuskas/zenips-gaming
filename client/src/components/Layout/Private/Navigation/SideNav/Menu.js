import React, { Component } from "react";
import SearchBox from "./SearchBox";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loadModal } from "../../../../../actions/modalActions";
import { SlideDown } from "react-slidedown";
import "react-slidedown/lib/slidedown.css";
const MODAL_PROPS = {
  width: "50%",
  left: "30%",
  header: "Toolbox"
};
class Menu extends Component {
  constructor() {
    super();
    this.state = {
      dropdown: false
    };
  }
  FirstChild = props => {
    const childrenArray = React.Children.toArray(props.children);
    return childrenArray[0] || null;
  };
  componentDidMount() {
    window.addEventListener("keydown", this.listenKeyboard.bind(this), true);
  }

  listenKeyboard = event => {
    if (event.keyCode === 84 && event.shiftKey) {
      this.props.loadModal("TOOLBOX", MODAL_PROPS);
    }
  };

  toggleDropdown = () => {
    this.setState(prevState => {
      return { dropdown: !prevState.dropdown };
    });
  };

  render() {
    const { inbox, archive, toggleSidenavMobile } = this.props;
    let dropDownMenu;
    this.state.dropdown
      ? (dropDownMenu = (
          <ul className="list-unstyled sidenav-submenu menu-show">
            <li>
              <Link to="/dashboard/articles" onClick={toggleSidenavMobile}>
                <i className="fas fa-search" /> <span> Browse </span>
              </Link>
            </li>
            <li>
              <Link to="/dashboard/articles/new" onClick={toggleSidenavMobile}>
                <i className="fas fa-plus" /> <span> New Article </span>
              </Link>
            </li>
            <li>
              <Link to="/dashboard/tags" onClick={toggleSidenavMobile}>
                <i className="fas fa-tags" /> <span> Tags </span>
              </Link>
            </li>
          </ul>
        ))
      : (dropDownMenu = null);
    return (
      <ul className="list-unstyled components">
        <div style={{ textAlign: "center" }}>
          <SearchBox />
        </div>
        <div className="scrollbox">
          <li>
            <Link to="/dashboard" onClick={toggleSidenavMobile}>
              <i className="fas fa-tachometer-alt" />
              <span> Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/inbox" onClick={toggleSidenavMobile}>
              <i className="fas fa-inbox" />
              <span>
                Inbox <i className="badge-menu badge-green">{inbox}</i>
              </span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/archive" onClick={toggleSidenavMobile}>
              <i className="fas fa-archive" />
              <span>
                Archive <i className="badge-menu badge-red">{archive}</i>
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="#!"
              className="disabled-menu"
              onClick={toggleSidenavMobile}
            >
              <i className="fas fa-chart-bar" /> <span>Analytics</span>
            </Link>
          </li>
          <li>
            <Link
              to="#!"
              className="disabled-menu"
              onClick={toggleSidenavMobile}
            >
              <i className="fab fa-youtube" /> <span>YT Channel</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/patchnotes" onClick={toggleSidenavMobile}>
              <i className="fas fa-bug" /> <span>Patch Notes</span>
            </Link>
          </li>
          <li>
            <a
              href="#!"
              onClick={() => this.toggleDropdown()}
              className="dropdown-toggle sidenav-dropdown-toggle"
            >
              <i className="fas fa-edit" /> <span>Articles</span>
            </a>
            <SlideDown className={"my-dropdown-slidedown"}>
              {dropDownMenu}
            </SlideDown>
          </li>
          <li>
            <div
              id="toolbox-menu"
              onClick={() => this.props.loadModal("TOOLBOX", MODAL_PROPS)}
            >
              <i className="fas fa-tools" /> <span>Toolbox</span>
            </div>
          </li>
          <li>
            <Link to="/dashboard/team" onClick={toggleSidenavMobile}>
              <i className="fas fa-users" /> <span>The Team</span>
            </Link>
          </li>
          <li>
            <a
              href="https://zenipsgaming.herokuapp.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <i className="fas fa-globe" /> <span>Production App</span>
            </a>
          </li>
          <li>
            <Link
              to="#!"
              className="disabled-menu"
              onClick={toggleSidenavMobile}
            >
              <i className="fas fa-chart-bar" /> <span> Reports </span>
            </Link>
          </li>
        </div>
      </ul>
    );
  }
}

// Pass our state from redux to props
const mapStateToProps = state => ({
  modal: state.modal
});

// Connect to the store and allow redirect via withRouter
export default connect(
  mapStateToProps,
  { loadModal }
)(Menu);
