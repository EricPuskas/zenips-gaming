import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withRouter } from "react-router-dom";
import { ReCaptcha } from "react-recaptcha-google";
// Actions
import {
  createMessage,
  clearErrors
} from "../../../../actions/messagesActions";
// Components
import Navigation from "../../../Layout/Public/Navigation/Navigation";
import Footer from "../../../Layout/Public/Footer/Footer";
import InputGroup from "../../../Common/InputGroup";
import TextArea from "../../../Common/TextArea";
import Tilt from "react-tilt";
import lozad from "lozad";

//CSS
import "./Contact.css";
let lastScrollTop = 0;
class Contact extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
    this.state = {
      mobile: false,
      large_screen: false,
      display_update: false,
      hideFooter: false,
      hideTopNav: false,
      expandContent: false,
      name: "",
      email: "",
      content: "",
      subject: "",
      token: "",
      errors: {}
    };
  }
  componentDidMount() {
    document.title = "Zenips Gaming | News";
    const observer = lozad(); // lazy loads elements with default selector as '.lozad'
    observer.observe();
    if (this.captchaDemo) {
      this.captchaDemo.reset();
    }
    window.innerWidth <= 813 &&
      this.setState(prevState => {
        return { mobile: !prevState.mobile };
      });

    window.innerWidth >= 1024 &&
      window.innerWidth < 1537 &&
      this.setState(prevState => {
        return { large_screen: !prevState.large_screen };
      });
  }

  handleScroll = e => {
    e.stopPropagation();
    const container = document.getElementById("container");
    let st = window.pageYOffset || container.scrollTop;

    if (st > lastScrollTop) {
      // downscroll code
      if (this.state.hideFooter === false) {
        this.setState({
          expandContent: true,
          hideFooter: true,
          hideTopNav: true
        });
      }
    } else {
      // upscroll code
      if (this.state.hideFooter === true) {
        this.setState({
          expandContent: false,
          hideFooter: false,
          hideTopNav: false
        });
      }
    }
    lastScrollTop = st <= 0 ? 0 : st;
  };

  onLoadRecaptcha() {
    if (this.captchaDemo) {
      this.captchaDemo.reset();
    }
  }
  verifyCallback(recaptchaToken) {
    // Here you will get the final recaptchaToken!!!
    if (recaptchaToken) {
      this.setState({ token: recaptchaToken });
    }
  }

  componentWillUnmount() {
    this.props.clearErrors();
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

  changeInput = event => {
    this.setState({ [event.target.name]: event.target.value });
    if (event.target.name === "content") {
      let subject = event.target.value.substring(0, 100);
      this.setState({ subject });
    }
  };

  submitForm = e => {
    e.preventDefault();
    const data = {
      name: this.state.name,
      email: this.state.email,
      subject: this.state.subject,
      content: this.state.content,
      token: this.state.token
    };
    this.props.createMessage(data);
  };

  render() {
    const { error } = this.state.errors;
    let contentClass = classNames({
      "content-container": true,
      expand: this.state.expandContent
    });
    return (
      <div>
        <Navigation hideTopNav={this.state.hideTopNav} />
        <div className="wrapper_main">
          <div
            id="container"
            onScroll={e => this.handleScroll(e)}
            className={contentClass}
          >
            <div className="row">
              <div className="col-12 col-lg-1 col-xl-2 reset-padding" />
              <div className="col-12 col-lg-8 col-xl-8 reset-padding">
                <div className="contact-us-container text-center">
                  <h1 style={{ paddingTop: "1rem" }}>Get in touch with us!</h1>
                  <span style={{ fontSize: "1.1rem", fontWeight: "700" }}>
                    zenips.official@gmail.com
                  </span>
                  <div className="contact-us-box">
                    <div className="row">
                      <div className="col-12 col-lg-5 col-xl-5 center-div reset-padding">
                        <Tilt className="Tilt" options={{ max: 50 }}>
                          <img
                            src="https://www.ywcaprinceton.org/wp-content/uploads/cropped-placeholder.jpg"
                            data-src="https://www.shareicon.net/download/2015/09/27/108297_email_512x512.png"
                            alt="Send message logo"
                            className="lozad img-responsive message-logo"
                          />
                        </Tilt>
                      </div>
                      <div className="col-12 col-lg-7 col-xl-7 reset-padding">
                        <div className="message-form-box">
                          <form onSubmit={this.submitForm}>
                            <InputGroup
                              placeholder="Name"
                              profileFormGroup={true}
                              name="name"
                              type="text"
                              value={this.state.name}
                              error={error.name}
                              icon="far fa-user"
                              onChange={e => this.changeInput(e)}
                            />
                            <InputGroup
                              placeholder="Email"
                              profileFormGroup={true}
                              name="email"
                              type="email"
                              value={this.state.email}
                              error={error.email}
                              icon="far fa-envelope"
                              onChange={e => this.changeInput(e)}
                            />
                            <label>Your Message: </label>
                            <TextArea
                              id="message-content"
                              name="content"
                              value={this.state.content}
                              error={error.content}
                              placeholder="Your message here..."
                              onChange={e => this.changeInput(e)}
                              maxLength="700"
                              rows="7"
                              large={true}
                              profileFormGroup={true}
                            />
                            <div className="char-count-bio">
                              <span style={{ color: "#222", fontSize: "1rem" }}>
                                Characters left:{" "}
                                {700 - this.state.content.length}
                              </span>
                            </div>
                            <div>
                              {error && (
                                <div className="errorMsg">
                                  {error.error_message}
                                </div>
                              )}
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="text-center">
                          <span>
                            <strong>
                              By proceeding, you agree to our{" "}
                              <a href="!#">Terms</a> and that you have read our{" "}
                              <a href="!#">Privacy Policy</a>.
                            </strong>
                          </span>
                        </div>
                        <div className="contact-form-bottom">
                          <ReCaptcha
                            ref={el => {
                              this.captchaDemo = el;
                            }}
                            size="large"
                            data-theme="dark"
                            render="explicit"
                            sitekey="6LeY020UAAAAACA_9XIsSNiUl7DJbg2qnLySLfrq"
                            onloadCallback={this.onLoadRecaptcha}
                            verifyCallback={this.verifyCallback}
                          />
                          <button
                            className="btn btn-orange-c"
                            // disabled={this.state.token.length === 0}
                            type="submit"
                          >
                            Send
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-2 col-xl-2 reset-padding" />
            </div>
          </div>
        </div>
        <Footer hideFooter={this.state.hideFooter} />
      </div>
    );
  }
}

Contact.propTypes = {
  errors: PropTypes.object,
  messages: PropTypes.object.isRequired,
  createMessage: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  messages: state.messages
});

export default connect(
  mapStateToProps,
  { createMessage, clearErrors }
)(withRouter(Contact));
