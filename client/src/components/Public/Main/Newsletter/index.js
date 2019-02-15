import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { loadReCaptcha, ReCaptcha } from "react-recaptcha-google";
// Actions
import {
  clearErrors,
  addSubscriber,
  clearSubscribeMsg
} from "../../../../actions/memberActions";
// Components
import Navigation from "../../../Layout/Public/Navigation/Navigation";
import Footer from "../../../Layout/Public/Footer/Footer";
import InputGroup from "../../../Common/InputGroup";

//CSS
import "./Newsletter.css";
let lastScrollTop = 0;
class Newsletter extends PureComponent {
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
      email: "",
      token: "",
      errors: {},
      message: ""
    };
  }
  componentDidMount() {
    document.title = "Zenips Gaming | Subscribe";
    loadReCaptcha();
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
    this.props.clearSubscribeMsg();
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
  };

  submitForm = e => {
    e.preventDefault();
    const data = {
      email: this.state.email,
      token: this.state.token
    };
    this.props.addSubscriber(data);
    this.setState({
      email: "",
      token: ""
    });
    this.props.clearErrors();
    this.captchaDemo.reset();
  };

  render() {
    const { error } = this.state.errors;
    const { subscribe_msg } = this.props.member;
    let contentClass = classNames({
      "content-container": true,
      expand: this.state.expandContent
    });
    let error_message, success_message;
    if (error) {
      error_message = (
        <div className="errorMsg fadeInEnd">{error.error_message}</div>
      );
    }

    if (subscribe_msg && !error) {
      success_message = (
        <div className="successMsg fadeInEnd">{subscribe_msg}</div>
      );
    }
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
              <div className="col-12 col-lg-8 col-xl-8 reset-padding center-div">
                <div className="newsletter-container text-center">
                  <h1 style={{ paddingTop: "1rem" }}>
                    Subscribe to our Newsletter
                  </h1>
                  <div className="newsletter-box">
                    <div className="row noPaddingMobile">
                      <div className="col-12 noPaddingMobile">
                        <div className="newsletter-form-box">
                          <p>
                            Signup for our weekly newsletter to get the latest
                            news, updates and amazing stories delivered directly
                            in your inbox.
                          </p>
                          <form onSubmit={this.submitForm}>
                            <div className="text-center recaptcha-center">
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
                            </div>

                            <div>
                              {error_message}
                              {success_message}
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className="col-12" style={{}}>
                        <div className="text-center">
                          <span>
                            <strong>
                              By proceeding, you agree to our{" "}
                              <Link to="/terms">Terms</Link> and that you have
                              read our <Link to="/privacy">Privacy Policy</Link>
                              .
                            </strong>
                          </span>
                        </div>
                      </div>
                      <div className="col-12 col-lg-8 col-xl-8 center-div">
                        <div className="newsletter-form-bottom">
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
                          <button
                            className="btn btn-orange-c"
                            disabled={this.state.token.length === 0}
                            type="submit"
                            onClick={e => this.submitForm(e)}
                          >
                            Subscribe
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer hideFooter={this.state.hideFooter} />
      </div>
    );
  }
}

Newsletter.propTypes = {
  errors: PropTypes.object,
  member: PropTypes.object.isRequired,
  clearErrors: PropTypes.func.isRequired,
  addSubscriber: PropTypes.func.isRequired,
  clearSubscribeMsg: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  member: state.member
});

export default connect(
  mapStateToProps,
  { clearErrors, addSubscriber, clearSubscribeMsg }
)(Newsletter);
