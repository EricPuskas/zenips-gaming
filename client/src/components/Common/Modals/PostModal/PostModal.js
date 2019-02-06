// DEPENDENCIES
import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import PropTypes from "prop-types";
//  ACTIONS
import { hideModal } from "../../../../actions/modalActions";
// COMPONENTS
import Modal from "../Modal";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import LoaderSuccess from "../../Loader/LoaderSuccess";
import LoaderSmall from "../../Loader/LoaderSmall";
// CSS
import "../Modals.css";

class PostModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fade: false,
      errors: {}
    };
    this.listenKeyboard.bind(this);
  }
  componentDidMount() {
    window.addEventListener("keydown", this.listenKeyboard, false);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.listenKeyboard, false);
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.errors) {
      return { errors: nextProps.errors };
    } else return null;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors) {
      this.setState(() => ({ errors: this.props.errors }));
    }
  }

  listenKeyboard = event => {
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
    let overlayDiv = classNames({
      "modal-overlay-div": true,
      "fade-overlay": this.state.fade
    });

    let dialogDiv = classNames({
      "modal-dialog-div": true,
      "fade-dialog": this.state.fade
    });
    const {
      id,
      title,
      user,
      width,
      left,
      top,
      submitForm,
      header,
      message,
      success
    } = this.props.modal.props;
    let content;
    const { delete_loading, posts, page } = this.props.posts;
    const { error, error_loading } = this.state.errors;
    let errorPost = error.postnotfound;
    if (delete_loading) {
      content = <LoaderSuccess msg={success} margin="2vh 0" />;
    } else {
      content = (
        <div>
          <div className="post-info-modal">
            <hr />
            <div>
              <p>
                <strong>Title:</strong> {title}
              </p>
              <p>
                Written by <strong>{user}</strong>
              </p>
            </div>
          </div>
          <hr />
          <div className="text-center">
            {error_loading ? <LoaderSmall /> : <span>{message}</span>}

            <Footer>
              <button
                className="btn btn-green-c"
                onClick={() => submitForm(id, posts.length, page)}
              >
                <i className="fas fa-check-circle" /> Yes
              </button>
              <button
                className="btn btn-red-c"
                onClick={() => this.onCloseModal()}
              >
                <i className="fas fa-times-circle" /> No
              </button>
            </Footer>
          </div>
        </div>
      );
    }
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
        <Header header={header} onCloseModal={this.onCloseModal} />
        {errorPost ? (
          <div>
            <Body>
              {error_loading ? (
                <div className="errorMsg">
                  <LoaderSmall />
                </div>
              ) : (
                <div className="errorMsg">Error: {errorPost}</div>
              )}
            </Body>
            <Footer>
              <button
                className="btn btn-green-c"
                onClick={() => window.location.reload()}
              >
                <i className="fas fa-check-circle" /> Reload
              </button>
              <button
                className="btn btn-yellow-c"
                onClick={() => submitForm(id, posts.length, page)}
              >
                <i className="fas fa-redo" /> Try Again
              </button>
              <button
                className="btn btn-red-c"
                onClick={() => this.onCloseModal()}
              >
                <i className="fas fa-times-circle" /> Close
              </button>
            </Footer>
          </div>
        ) : (
          <Body>{content}</Body>
        )}
      </Modal>
    );
  }
}

PostModal.propTypes = {
  modal: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  posts: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  modal: state.modal,
  posts: state.posts,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { hideModal }
)(PostModal);
