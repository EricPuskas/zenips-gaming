import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { sendForgotPwEmail, clearErrors } from "../../actions/memberActions";
import InputGroup from "../Common/InputGroup";
import Logo from "../../assets/img/logo.png";
import LoaderSuccess from "../Common/Loader/LoaderSuccess";
import LoaderLarge from "../Common/Loader/LoaderLarge";
import "./Auth.css";

class ForgotPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    this.props.clearErrors();
    document.title = "Zenips Gaming - Forgot Password";
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.errors) {
      return { errors: nextProps.errors };
    } else return null;
  }

  componentDidUpdate(prevProps) {
    const isAuthenticated = this.props.auth.isAuthenticated;

    if (prevProps.errors !== this.props.errors) {
      this.setState(() => ({ errors: this.props.errors }));
    }

    if (isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  changeInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  sendEmail = () => {
    let data = {
      email: this.state.email
    };
    this.props.sendForgotPwEmail(data, this.props.history);
  };

  onSubmitLoginForm = event => {
    event.preventDefault();
    this.sendEmail();
  };

  render() {
    const { error } = this.state.errors;
    const { email } = this.state;
    const { sending_email, reset_pw } = this.props.member;
    let content;
    let message = `An e-mail has been sent to ${email} with further instructions.`;
    sending_email
      ? (content = (
          <div className="auth-container container">
            <div className="auth-border" />
            <div className="login-form">
              <div className="main-div" style={{ maxWidth: "75%" }}>
                <LoaderLarge msg={"Sending email..."} margin="5vh" />
              </div>
            </div>
          </div>
        ))
      : (content = (
          <div className="auth-container container">
            <div className="panel">
              <div className="page-title">
                <img src={Logo} className="logo-auth" alt="Logo" />
              </div>
            </div>
            <div className="auth-border" />
            <div className="login-form">
              <div className="main-div">
                <div className="panel">
                  <div className="login-title" />
                </div>
                <form id="Login" onSubmit={this.onSubmitLoginForm}>
                  <InputGroup
                    placeholder="Email Address"
                    name="email"
                    type="email"
                    value={this.state.email}
                    icon="far fa-envelope"
                    onChange={this.changeInput}
                    error={error.email || error.error_message}
                  />
                  <button type="submit" className="btn btn-primary">
                    Reset my password
                  </button>
                </form>
              </div>
              <div className="auth-footer">
                <Link to="/auth/login" className="btn btn-primary">
                  Back
                </Link>
              </div>
            </div>
          </div>
        ));

    reset_pw &&
      (content = (
        <div className="auth-container container">
          <div className="auth-border" />
          <div className="login-form">
            <div className="main-div" style={{ maxWidth: "75%" }}>
              <LoaderSuccess msg={message} margin="5vh 5vh" />
            </div>
          </div>
        </div>
      ));

    return content;
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  member: state.member,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { sendForgotPwEmail, clearErrors }
)(withRouter(ForgotPassword));
