// DEPENDENCIES
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
//  ACTIONS
import { hideModal } from "../../../../actions/modalActions";
// COMPONENTS
import Modal from "../Modal";
import Header from "./Header";
import Body from "./Body";
// CSS
import "../Modals.css";

class CreditsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fade: false,
      credit: false,
      thumbnail_author: "",
      thumbnail_source: "",
      errors: {}
    };
    this.listenKeyboard.bind(this);
  }

  componentDidMount() {
    window.addEventListener("keydown", this.listenKeyboard, false);
    let thumbnail_author = this.props.modal.props.thumbnail_author;
    let thumbnail_source = this.props.modal.props.thumbnail_source;
    this.setState({
      thumbnail_author,
      thumbnail_source
    });
    if (
      thumbnail_author !== "zenipsgaming" &&
      thumbnail_source !== "zenipsgaming"
    ) {
      this.setState({
        credit: true
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.listenKeyboard, false);
  }

  handleCheckbox = event => {
    let thumbnail_author = this.props.modal.props.thumbnail_author;
    let thumbnail_source = this.props.modal.props.thumbnail_source;
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
      thumbnail_author,
      thumbnail_source
    });
    this.props.modal.props.updateThumbnailCredits(
      thumbnail_author,
      thumbnail_source
    );
    if (value === false) {
      this.setState({
        thumbnail_author: "zenipsgaming",
        thumbnail_source: "zenipsgaming"
      });
      this.props.modal.props.updateThumbnailCredits(
        thumbnail_author,
        thumbnail_source
      );
    }
  };

  changeInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitForm = (author, source) => {
    this.props.modal.props.updateThumbnailCredits(author, source);
    setTimeout(() => this.props.hideModal(), 400);
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
    const { width, left, error } = this.props.modal.props;
    const { thumbnail_author, thumbnail_source, credit } = this.state;

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
          thumbnail_author={thumbnail_author}
          thumbnail_source={thumbnail_source}
          error={error}
          onChange={this.changeInput}
          credit={credit}
          handleCheckbox={this.handleCheckbox}
          submitForm={this.submitForm}
          onCloseModal={this.onCloseModal}
        />
      </Modal>
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
  { hideModal }
)(withRouter(CreditsModal));
