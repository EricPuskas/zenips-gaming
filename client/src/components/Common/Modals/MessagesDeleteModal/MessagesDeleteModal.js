// DEPENDENCIES
import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
//  ACTIONS
import { hideModal } from "../../../../actions/modalActions";

// COMPONENTS
import Modal from "../Modal";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import LoaderSuccess from "../../Loader/LoaderSuccess";
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

  reload = () => {
    setTimeout(() => this.props.hideModal(), 200);
    setTimeout(() => this.props.history.push("/dashboard/articles"), 200);
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
      data,
      width,
      left,
      top,
      submitForm,
      header,
      success
    } = this.props.modal.props;
    let content;
    const { delete_loading } = this.props.messages;
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
            <h1 className="text-center">Are you sure you want to proceed?</h1>
            <div className="text-center">
              <Footer>
                <button
                  className="btn btn-green-c"
                  onClick={() => submitForm(data)}
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
        {content}
      </Modal>
    );
  }
}

// Props Validation
ArticleDeleteModal.propTypes = {
  modal: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  messages: PropTypes.object.isRequired,
  hideModal: PropTypes.func.isRequired
};

// Pass our state from redux to props
const mapStateToProps = state => ({
  modal: state.modal,
  messages: state.messages,
  errors: state.errors
});

// Connect to the store and allow redirect via withRouter
export default connect(
  mapStateToProps,
  { hideModal }
)(withRouter(ArticleDeleteModal));
