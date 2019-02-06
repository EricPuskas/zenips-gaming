// DEPENDENCIES
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
import PropTypes from "prop-types";
//  ACTIONS
import { hideModal } from "../../../../actions/modalActions";
import { updateUserProfile } from "../../../../actions/memberActions";
// COMPONENTS
import Modal from "../Modal";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
// CSS
import "../Modals.css";
import "./BioModal.css";

class BioModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fade: false,
      bio: "",
      errors: {}
    };
    this.listenKeyboard.bind(this);
  }

  componentDidMount() {
    this.setState({ bio: this.props.modal.props.member.bio });
    window.addEventListener("keydown", this.listenKeyboard, false);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.listenKeyboard, false);
  }

  changeInput = event => {
    this.setState({ bio: event.target.value });
  };

  submitForm = event => {
    event.preventDefault();
    const username = this.props.modal.props.member.username;
    const id = this.props.modal.props.member._id;
    const history = this.props.history;
    const data = {
      firstName: this.props.modal.props.member.firstName,
      lastName: this.props.modal.props.member.lastName,
      email: this.props.modal.props.member.email,
      role: this.props.modal.props.member.role,
      facebook: this.props.modal.props.member.facebook,
      linkedin: this.props.modal.props.member.linkedin,
      twitter: this.props.modal.props.member.twitter,
      instagram: this.props.modal.props.member.instagram,
      description: this.props.modal.props.member.description,
      bio: this.state.bio
    };
    this.props.updateUserProfile(username, id, data, history);
    this.props.hideModal();
  };

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

  changeBioContent = e => {
    this.setState({ bio: e.target.value });
  };
  render() {
    const { width, error } = this.props.modal.props;

    let overlayDiv = classNames({
      "modal-overlay-div": true,
      "fade-overlay": this.state.fade
    });

    let dialogDiv = classNames({
      "modal-dialog-div": true,
      "fade-dialog": this.state.fade
    });

    return (
      <Modal
        overlayDiv={overlayDiv}
        dialogDiv={dialogDiv}
        width={width}
        onOverlayClick={this.onOverlayClick}
        onDialogClick={this.onDialogClick}
      >
        <Header onCloseModal={this.onCloseModal} />
        <Body
          value={this.state.bio}
          error={error}
          onChange={this.changeBioContent}
        />
        <Footer submitForm={this.submitForm} onCloseModal={this.onCloseModal} />
      </Modal>
    );
  }
}

// Props Validation
BioModal.propTypes = {
  updateUserProfile: PropTypes.func.isRequired
};

// Pass our state from redux to props
const mapStateToProps = state => ({
  modal: state.modal
});

// Connect to the store and allow redirect via withRouter
export default connect(
  mapStateToProps,
  { hideModal, updateUserProfile }
)(withRouter(BioModal));
