// DEPENDENCIES
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
import PropTypes from "prop-types";
//  ACTIONS
import { hideModal } from "../../../../actions/modalActions";
import { deleteUser, deleteUserAdmin } from "../../../../actions/teamActions";
// COMPONENTS
import Modal from "../Modal";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import LoaderLarge from "../../Loader/LoaderLarge";
// CSS
import "../Modals.css";

class DelAccModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fade: false,
      confirmation: false,
      errors: {}
    };
    this.listenKeyboard.bind(this);
  }

  changeInput = e => {
    let input = e.target.value;
    let username = this.props.modal.props.username;
    if (input === `Delete ${username}`) {
      this.setState({ confirmation: true });
    } else {
      this.setState({ confirmation: false });
    }
  };

  deleteUser = () => {
    const currentUser = this.props.auth.user._id;
    const targetUser = this.props.modal.props.id;
    const history = this.props.history;
    currentUser === targetUser
      ? this.props.deleteUser(this.props.modal.props.id, history)
      : this.props.deleteUserAdmin(this.props.modal.props.id, history);
  };
  componentDidMount() {
    window.addEventListener("keydown", this.listenKeyboard, false);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.listenKeyboard, false);
  }

  listenKeyboard = event => {
    event.stopPropagation();
    if (event.key === "Escape" || event.keyCode === 27) {
      this.setState(prevState => {
        return { fade: !prevState.fade };
      });
      setTimeout(() => this.props.hideModal(), 400);
    }
  };

  onOverlayClick = () => {
    this.setState(prevState => {
      return { fade: !prevState.fade };
    });
    setTimeout(() => this.props.hideModal(), 400);
  };

  onDialogClick = event => {
    event.stopPropagation();
  };

  onCloseModal = () => {
    this.setState(prevState => {
      return { fade: !prevState.fade };
    });
    setTimeout(() => this.props.hideModal(), 400);
  };

  render() {
    console.log(this.props.modal.props);
    const { width, left } = this.props.modal.props;
    const { delete_loading, member } = this.props.member;
    let overlayDiv = classNames({
      "modal-overlay-div": true,
      "fade-overlay": this.state.fade
    });

    let dialogDiv = classNames({
      "modal-dialog-div": true,
      "fade-dialog": this.state.fade
    });
    let content;

    this.props.member !== undefined
      ? (content = (
          <div>
            <Header onCloseModal={this.onCloseModal} />
            <Body
              changeInput={this.changeInput}
              username={member.username}
              email={member.email}
            />
            <Footer
              deleteUser={this.deleteUser}
              id={member._id}
              history={this.props.history}
              confirmation={this.state.confirmation}
              onCloseModal={this.onCloseModal}
            />
          </div>
        ))
      : (content = "");

    if (delete_loading) {
      content = (
        <LoaderLarge
          msg={"Deleting account, please wait. Redirecting..."}
          margin="5vh"
        />
      );
    }

    return (
      <Modal
        overlayDiv={overlayDiv}
        dialogDiv={dialogDiv}
        width={width}
        left={left}
        onOverlayClick={this.onOverlayClick}
        onDialogClick={this.onDialogClick}
      >
        {content}
      </Modal>
    );
  }
}

DelAccModal.propTypes = {
  modal: PropTypes.object.isRequired,
  member: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteUser: PropTypes.func.isRequired,
  deleteUserAdmin: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  modal: state.modal,
  auth: state.auth,
  member: state.member
});

export default connect(
  mapStateToProps,
  { hideModal, deleteUser, deleteUserAdmin }
)(withRouter(DelAccModal));
