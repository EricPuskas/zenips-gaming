import React, { Component } from "react";
import SearchBox from "./SearchBox";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loadModal } from "../../../../../actions/modalActions";
const MODAL_PROPS = {
  width: "50%",
  left: "30%",
  header: "Toolbox"
};
class Menu extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.listenKeyboard.bind(this), true);
  }

  listenKeyboard = event => {
    if (event.keyCode === 70 && event.shiftKey) {
      this.props.loadModal("TOOLBOX", MODAL_PROPS);
    }
  };

  render() {
    const { inbox, archive, toggleSidenavMobile } = this.props;
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
              href="#articlesSubmenu"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle sidenav-dropdown-toggle"
            >
              <i className="fas fa-edit" /> <span>Articles</span>
            </a>
            <ul
              className="collapse list-unstyled sidenav-submenu"
              id="articlesSubmenu"
            >
              <li>
                <Link to="/dashboard/articles" onClick={toggleSidenavMobile}>
                  <i className="fas fa-search" /> <span> Browse </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/articles/new"
                  onClick={toggleSidenavMobile}
                >
                  <i className="fas fa-plus" /> <span> New Article </span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/tags" onClick={toggleSidenavMobile}>
                  <i className="fas fa-tags" /> <span> Tags </span>
                </Link>
              </li>
            </ul>
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
            <Link
              to="#!"
              className="disabled-menu"
              onClick={toggleSidenavMobile}
            >
              <i className="fas fa-globe" /> <span>Production App</span>
            </Link>
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
