import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser, clearErrors } from "../../actions/authActions";
import InputGroup from "../Common/InputGroup";
import Logo from "../../assets/img/logo.png";

import "./Auth.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    this.props.clearErrors();
    document.title = "Zenips Gaming - Login";
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

  onSubmitLoginForm = event => {
    event.preventDefault(); // Don't refresh the page upon submit
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
  };

  render() {
    const { error } = this.state.errors;
    return (
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
              <InputGroup
                placeholder="Password"
                name="password"
                icon="fas fa-lock"
                type="password"
                value={this.state.password}
                onChange={this.changeInput}
                error={error.password || error.error_message}
              />

              {/* <div className="auth-forgot">
                <Link to="/auth/forgot-pass">
                  <small>Forgot your password?</small>
                </Link>
              </div> */}

              <div className="login-btn-group" style={{ paddingTop: "25px" }}>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                <Link to="/auth/register" className="btn btn-primary">
                  Register
                </Link>
              </div>
            </form>
          </div>
          <div className="auth-footer">
            <Link to="/" className="btn btn-primary">
              Home
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser, clearErrors }
)(Login);
