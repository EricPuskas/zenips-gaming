import React, { Component } from "react";
import TopNav from "./TopNav/TopNav";
import SideNav from "./SideNav/SideNav";
import { connect } from "react-redux";
import { getPreviewMessages } from "../../../../actions/messagesActions";
import { loadModal } from "../../../../actions/modalActions";
import PropTypes from "prop-types";

class Navigation extends Component {
  componentDidMount() {
    this.props.getPreviewMessages();
  }
  render() {
    const {
      status,
      user,
      onLogoutClick,
      toggleCollapse,
      toggleSidenavMobile,
      toggleSidenav,
      isOpen,
      isAuthenticated
    } = this.props;

    const { inbox, preview, archive } = this.props.messages;
    let inbox_count, archive_count;
    inbox > 99 ? (inbox_count = "99+") : (inbox_count = inbox);
    archive > 99 ? (archive_count = "99+") : (archive_count = archive);

    const Navbar = (
      <div>
        <SideNav
          status={status}
          user={user}
          inbox={inbox_count}
          archive={archive_count}
          onLogoutClick={onLogoutClick}
          toggleSidenavMobile={toggleSidenavMobile}
        />
        <TopNav
          user={user}
          preview={preview}
          loadModal={this.props.loadModal}
          inbox={inbox_count}
          isOpen={isOpen}
          onLogoutClick={onLogoutClick}
          toggleCollapse={toggleCollapse}
          toggleSidenav={toggleSidenav}
        />
      </div>
    );
    return isAuthenticated ? Navbar : "";
  }
}

Navigation.propTypes = {
  loadModal: PropTypes.func.isRequired,
  getPreviewMessages: PropTypes.func.isRequired,
  messages: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  messages: state.messages
});

export default connect(
  mapStateToProps,
  { getPreviewMessages, loadModal }
)(Navigation);
