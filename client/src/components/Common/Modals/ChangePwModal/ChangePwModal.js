// DEPENDENCIES
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
import PropTypes from "prop-types";
//  ACTIONS
import { hideModal } from "../../../../actions/modalActions";
import { sendResetPwEmail } from "../../../../actions/memberActions";
import LoaderSuccess from "../../Loader/LoaderSuccess";
import LoaderLarge from "../../Loader/LoaderLarge";
// COMPONENTS
import Modal from "../Modal";
import Body from "./Body";
// CSS
import "../Modals.css";

class ChangePwModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fade: false,
      errors: {}
    };
  }

  componentDidMount() {
    this.sendEmail();
  }

  sendEmail = () => {
    let data = {
      email: this.props.modal.props.email
    };
    this.props.sendResetPwEmail(data);
  };

  render() {
    const { width, left, email } = this.props.modal.props;
    const { sending_email, reset_pw } = this.props.member;
    const { error } = this.props.errors;
    let content;
    let message = `An e-mail has been sent to ${email} with further instructions.`;

    sending_email
      ? (content = <LoaderLarge msg={"Sending email..."} margin="5vh" />)
      : (content = (
          <div>
            <Body error={error} />
          </div>
        ));
    reset_pw &&
      (content = (
        <div>
          <LoaderSuccess msg={message} margin="5vh 5vh" />
        </div>
      ));

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
        {content}
      </Modal>
    );
  }
}

// Props Validation
ChangePwModal.propTypes = {
  modal: PropTypes.object.isRequired,
  member: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

// Pass our state from redux to props
const mapStateToProps = state => ({
  modal: state.modal,
  member: state.member,
  errors: state.errors
});

// Connect to the store and allow redirect via withRouter
export default connect(
  mapStateToProps,
  { hideModal, sendResetPwEmail }
)(withRouter(ChangePwModal));
