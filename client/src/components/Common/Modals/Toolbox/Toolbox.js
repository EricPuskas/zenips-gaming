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
// CSS
import "../Modals.css";

class Toolbox extends React.Component {
  constructor() {
    super();
    this.state = {
      fade: false
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

    const { width, left, top, header } = this.props.modal.props;
    let content = (
      <div>
        <Header header={header} onCloseModal={this.onCloseModal} />
        <Body>
          <hr />
          <div className="row">
            <div className="col-12">
              <div className="row scrollable-toolbox toolbox-container">
                <div className="col-12 col-lg-4 col-xl-4">
                  <a
                    href="https://mlab.com/login/"
                    className="toolbox-item"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-database" /> MLab
                  </a>
                </div>
                <div className="col-12 col-lg-4 col-xl-4">
                  <a
                    href="https://dashboard.heroku.com"
                    className="toolbox-item"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-tachometer-alt" /> Heroku Dashboard
                  </a>
                </div>
                <div className="col-12 col-lg-4 col-xl-4">
                  <a
                    href="https://cloudinary.com/console"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="toolbox-item"
                  >
                    <i className="fas fa-cloud" /> Cloudinary
                  </a>
                </div>
                <div className="col-12 col-lg-4 col-xl-4">
                  <a
                    href="https://logo-app.ucraft.com/"
                    className="toolbox-item"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-magic" /> Logo Editor
                  </a>
                </div>
                <div className="col-12 col-lg-4 col-xl-4">
                  <a
                    href="https://htmlcolorcodes.com/color-picker/"
                    className="toolbox-item"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-palette" /> Color Picker
                  </a>
                </div>
                <div className="col-12 col-lg-4 col-xl-4">
                  <a
                    href="https://uigradients.com"
                    className="toolbox-item"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-fill-drip" /> uGradient
                  </a>
                </div>
                <div className="col-12 col-lg-4 col-xl-4">
                  <a
                    href="https://codepen.io/"
                    className="toolbox-item"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-codepen" /> Codepen
                  </a>
                </div>
                <div className="col-12 col-lg-4 col-xl-4">
                  <a
                    href="https://tools.pingdom.com/"
                    className="toolbox-item"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-bolt" /> Pingdom
                  </a>
                </div>
                <div className="col-12 col-lg-4 col-xl-4">
                  <a
                    href="https://gtmetrix.com/"
                    className="toolbox-item"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-chart-line" /> GTmetrix
                  </a>
                </div>
                <div className="col-12 col-lg-4 col-xl-4">
                  <a
                    href="http://quirktools.com/screenfly/"
                    className="toolbox-item"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-mobile-alt" /> Multi-screen Test
                  </a>
                </div>
                <div className="col-12 col-lg-4 col-xl-4">
                  <a
                    href="https://developer.mozilla.org/ro/"
                    className="toolbox-item"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-info" /> MDN
                  </a>
                </div>
                <div className="col-12 col-lg-4 col-xl-4">
                  <a
                    href="https://stackoverflow.com/"
                    className="toolbox-item"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-stack-overflow" /> Stack Overflow
                  </a>
                </div>
                <div className="col-12 col-lg-4 col-xl-4">
                  <a
                    href="https://www.google.com/"
                    className="toolbox-item"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-google" /> Google
                  </a>
                </div>
                <div className="col-12 col-lg-4 col-xl-4">
                  <a
                    href="https://disqus.com/home/"
                    className="toolbox-item"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="far fa-comments" /> Disqus Admin
                  </a>
                </div>
                <div className="col-12 col-lg-4 col-xl-4">
                  <a
                    href="https://developers.facebook.com/apps/353263045214735/dashboard/"
                    className="toolbox-item"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-facebook-f" /> Facebook Dev
                  </a>
                </div>
                <div className="col-12 col-lg-4 col-xl-4">
                  <a
                    href="https://github.com/EricPuskas/zenips-gaming-client"
                    className="toolbox-item"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-github" /> Github
                  </a>
                </div>
                <div className="col-12 col-lg-4 col-xl-4">
                  <a
                    href="https://fontawesome.com/"
                    className="toolbox-item"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="far fa-flag" /> FontAwesome
                  </a>
                </div>
                <div className="col-12 col-lg-4 col-xl-4">
                  <a
                    href="https://reactjs.org/docs/hello-world.html"
                    className="toolbox-item"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-react" /> React Docs
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Body>
      </div>
    );
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
Toolbox.propTypes = {
  modal: PropTypes.object.isRequired
};

// Pass our state from redux to props
const mapStateToProps = state => ({
  modal: state.modal
});

// Connect to the store and allow redirect via withRouter
export default connect(
  mapStateToProps,
  { hideModal }
)(Toolbox);
