// DEPENDENCIES
import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
//  ACTIONS
import { hideModal } from "../../../../actions/modalActions";
import { deleteArticle } from "../../../../actions/articleActions";
// COMPONENTS
import Modal from "../Modal";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import LoaderSuccess from "../../Loader/LoaderSuccess";
import LoaderSmall from "../../Loader/LoaderSmall";
// CSS
import "../Modals.css";

class ArticleDeleteModal extends React.Component {
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

  // Invoked after the component is instantiated and when it receives new props
  // Update the errors state
  static getDerivedStateFromProps(nextProps) {
    if (nextProps.errors) {
      return { errors: nextProps.errors };
    } else return null;
  }

  // If component updates and the state doesn't match with the props, update the state.
  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors) {
      this.setState(() => ({ errors: this.props.errors }));
    }
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
      width,
      left,
      top,
      submitForm,
      header,
      message,
      success
    } = this.props.modal.props;
    let content;
    const { delete_loading } = this.props.articles;
    const { error, error_loading } = this.state.errors;
    let errorPost = error.articlenotfound;
    if (delete_loading) {
      content = (
        <Body>
          <LoaderSuccess msg={success} margin="2vh 0" />
        </Body>
      );
    } else {
      content = (
        <div>
          <Header header={header} onCloseModal={this.onCloseModal} />
          <Body>
            <hr />
            <div className="text-center">
              {error_loading ? <LoaderSmall /> : <span>{message}</span>}
              <Footer>
                <button
                  className="btn btn-green-c"
                  onClick={() => submitForm(id, this.props.history)}
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
          </Body>
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
        {errorPost ? (
          <div>
            <Header header={header} onCloseModal={this.onCloseModal} />
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
              <button className="btn btn-green-c" onClick={() => this.reload()}>
                <i className="fas fa-check-circle" /> Reload
              </button>
              <button
                className="btn btn-yellow-c"
                onClick={() => submitForm(id, this.props.history)}
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
          content
        )}
      </Modal>
    );
  }
}

// Props Validation
ArticleDeleteModal.propTypes = {
  modal: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  articles: PropTypes.object.isRequired,
  hideModal: PropTypes.func.isRequired,
  deleteArticle: PropTypes.func.isRequired
};

// Pass our state from redux to props
const mapStateToProps = state => ({
  modal: state.modal,
  articles: state.articles,
  errors: state.errors
});

// Connect to the store and allow redirect via withRouter
export default connect(
  mapStateToProps,
  { hideModal, deleteArticle }
)(withRouter(ArticleDeleteModal));
