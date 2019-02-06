// DEPENDENCIES
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
import PropTypes from "prop-types";
//  ACTIONS
import { hideModal } from "../../../../actions/modalActions";
import { updateUserAvatar } from "../../../../actions/memberActions";
import { getUserInfo } from "../../../../actions/authActions";
// COMPONENTS
import Modal from "../Modal";
import Header from "./Header";
import Body from "./Body";
// CSS
import "../Modals.css";

class AvatarModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fade: false,
      avatar: "",
      formData: "",
      errors: {}
    };
    this.listenKeyboard.bind(this);
  }

  componentDidMount() {
    this.setState({ avatar: this.props.modal.props.avatar });
    window.addEventListener("keydown", this.listenKeyboard, false);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.listenKeyboard, false);
  }

  changeInput = event => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = e => {
        this.setState({ avatar: e.target.result });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    const files = Array.from(event.target.files);
    const formData = new FormData();
    files.forEach((file, i) => {
      formData.append(i, file);
    });
    this.setState({ formData });
  };

  submitForm = event => {
    event.preventDefault();
    const username = this.props.modal.props.username;
    const id = this.props.modal.props.id;
    this.props.updateUserAvatar(id, username, this.state.formData);
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

  render() {
    const { width, left } = this.props.modal.props;
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
        left={left}
        onOverlayClick={this.onOverlayClick}
        onDialogClick={this.onDialogClick}
      >
        <Header onCloseModal={this.onCloseModal} />
        <Body
          submitForm={this.submitForm}
          onCloseModal={this.onCloseModal}
          avatar={this.state.avatar}
          changeInput={this.changeInput}
        />
      </Modal>
    );
  }
}

// Props Validation
AvatarModal.propTypes = {
  modal: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

// Pass our state from redux to props
const mapStateToProps = state => ({
  modal: state.modal,
  auth: state.auth
});

// Connect to the store and allow redirect via withRouter
export default connect(
  mapStateToProps,
  { hideModal, updateUserAvatar, getUserInfo }
)(withRouter(AvatarModal));
