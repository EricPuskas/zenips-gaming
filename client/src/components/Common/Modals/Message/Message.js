// DEPENDENCIES
import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Moment from "react-moment";
//  ACTIONS
import { hideModal } from "../../../../actions/modalActions";
// COMPONENTS
import LoaderSuccess from "../../../Common/Loader/LoaderSuccess";
import Modal from "../Modal";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";

// CSS
import "../Modals.css";

class Message extends React.Component {
  constructor() {
    super();
    this.state = {
      fade: false,
      isRead: true
    };
    this.listenKeyboard.bind(this);
  }
  componentDidMount() {
    window.addEventListener("keydown", this.listenKeyboard, false);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.listenKeyboard, false);
  }

  listenKeyboard = event => {
    event.stopPropagation();
    if (event.keyCode === 27) {
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

  toggleRead = id => {
    if (this.state.isRead === true) {
      this.setState({ isRead: false });
      this.props.modal.props.markAsUnread(id);
    } else {
      this.setState({ isRead: true });
      this.props.modal.props.markAsRead(id);
    }
  };

  moveMessage = id => {
    this.props.modal.props.moveMessage(id);
    this.setState(prevState => {
      return { fade: !prevState.fade };
    });
    setTimeout(() => this.props.hideModal(), 400);
  };

  exitModal = time => {
    let time_ext = time + 300;
    setTimeout(
      () =>
        this.setState(prevState => {
          return { fade: !prevState.fade };
        }),
      time
    );
    setTimeout(() => this.props.hideModal(), time_ext);
  };
  deleteMessage = id => {
    this.props.modal.props.deleteMessage(id);
    this.exitModal(1200);
  };

  redirectModal = () => {
    this.props.history.push("/dashboard/inbox");
    this.props.hideModal();
  };

  render() {
    let overlayDiv = classNames({
      "modal-overlay-div": true,
      "fade-overlay": this.state.fade
    });

    let dialogDiv = classNames({
      "modal-dialog-div": true,
      "fade-dialog": this.state.fade
    });

    const { width, left, top, message } = this.props.modal.props;
    const { delete_loading } = this.props.messages;
    let content, footerContent;
    this.props.modal.props.moveMessage !== undefined
      ? (footerContent = (
          <Footer
            id={message._id}
            isRead={this.state.isRead}
            location={message.location}
            toggleRead={this.toggleRead}
            moveMessage={this.moveMessage}
            deleteMessage={this.deleteMessage}
            onCloseModal={this.onCloseModal}
          />
        ))
      : (footerContent = (
          <div className="modal-footer-bio text-center">
            <button
              className="btn btn-green-c"
              onClick={() => this.redirectModal()}
            >
              Go to Inbox
            </button>
            <button
              className="btn btn-red-c"
              onClick={() => this.onCloseModal()}
            >
              Close
            </button>
          </div>
        ));

    if (message.sender !== undefined) {
      content = (
        <div>
          <Header header={message.subject} onCloseModal={this.onCloseModal} />
          <Body>
            <hr />
            <div className="row">
              <div className="col-12 scrollable-msg-modal msg-modal-container">
                <div className="row">
                  <div className="col-12 col-lg-6 col-xl-6">
                    <div className="message-d-sender">
                      <ul>
                        <li>
                          <span>From:</span>
                          <span>
                            <strong>{message.sender.name}</strong>
                          </span>
                        </li>
                        <li>
                          <span>Email:</span>
                          <span>
                            <strong>{`<${message.sender.email}>`}</strong>
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6 col-xl-6">
                    <div className="message-d-time">
                      <i className="far fa-clock" />
                      <span>
                        <Moment format="MMMM DD - YYYY / h:mm A">
                          {message.createdAt}
                        </Moment>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="message-d-content">
                  <p>{message.content}</p>
                </div>
              </div>
            </div>
          </Body>
          {footerContent}
        </div>
      );
    }
    if (delete_loading)
      content = <LoaderSuccess msg={"Message deleted."} margin="5vh" />;
    return (
      <Modal
        overlayDiv={overlayDiv}
        dialogDiv={dialogDiv}
        width={width}
        left={left}
        top={top}
        onOverlayClick={this.onOverlayClick}
        onDialogClick={this.onDialogClick}
      >
        {content}
      </Modal>
    );
  }
}

// Props Validation
Message.propTypes = {
  modal: PropTypes.object.isRequired,
  messages: PropTypes.object.isRequired
};

// Pass our state from redux to props
const mapStateToProps = state => ({
  modal: state.modal,
  messages: state.messages
});

// Connect to the store and allow redirect via withRouter
export default connect(
  mapStateToProps,
  { hideModal }
)(withRouter(Message));
