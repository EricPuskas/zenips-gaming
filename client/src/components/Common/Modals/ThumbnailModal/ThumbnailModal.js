// DEPENDENCIES
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
import PropTypes from "prop-types";
//  ACTIONS
import { hideModal } from "../../../../actions/modalActions";
// COMPONENTS
import Modal from "../Modal";
import Header from "./Header";
import Body from "./Body";
// CSS
import "../Modals.css";
const defaultThumbnail = "https://dummyimage.com/hd720";
class ThumbnailModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fade: false,
      thumbnail: "",
      thumbnail_file: "",
      formData: "",
      errors: {}
    };
    this.listenKeyboard.bind(this);
  }

  componentDidMount() {
    window.addEventListener("keydown", this.listenKeyboard, false);
    const props_thumbnail = this.props.modal.props.thumbnail;
    props_thumbnail.length > 500
      ? this.setState({
          thumbnail: defaultThumbnail,
          thumbnail_file: props_thumbnail
        })
      : this.setState({
          thumbnail: props_thumbnail,
          thumbnail_file: props_thumbnail
        });
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.listenKeyboard, false);
  }

  changeInputURL = e => {
    this.setState({ thumbnail: e.target.value });
    this.state.thumbnail !== defaultThumbnail &&
      this.setState({ formData: "" });
  };

  changeInput = event => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = e => {
        this.setState({
          thumbnail_file: e.target.result
        });
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

  submitForm = () => {
    if (this.state.formData !== "") {
      this.props.modal.props.updateThumbnailFile(true);
      this.props.modal.props.updateThumbnail(this.state.thumbnail_file);
    }
    if (
      this.state.formData === "" &&
      (this.state.thumbnail !== defaultThumbnail || this.state.thumbnail !== "")
    ) {
      this.props.modal.props.updateThumbnailFile(false);
      this.props.modal.props.updateThumbnail(this.state.thumbnail);
    }
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

  render() {
    const {
      width,
      left,
      updateThumbnail,
      updateThumbnailFile
    } = this.props.modal.props;
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
          thumbnail={this.state.thumbnail}
          thumbnail_file={this.state.thumbnail_file}
          changeInput={this.changeInput}
          updateThumbnail={updateThumbnail}
          updateThumbnailFile={updateThumbnailFile}
          changeInputURL={this.changeInputURL}
        />
      </Modal>
    );
  }
}

// Props Validation
ThumbnailModal.propTypes = {
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
  { hideModal }
)(withRouter(ThumbnailModal));
