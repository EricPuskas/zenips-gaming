import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser, clearErrors } from "../../actions/authActions";
import InputGroup from "../Common/InputGroup";
import Logo from "../../assets/img/logo.png";
import LoaderSuccess from "../Common/Loader/LoaderSuccess";
import "./Auth.css";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      username: "",
      firstName: "",
      lastName: "",
      reg_code: "",
      password: "",
      password_confirm: "",
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    this.props.clearErrors();
    document.title = "Zenips Gaming - Register";
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
    if (event.target.name === "reg_code") {
      let foo = event.target.value.split("-").join("");
      if (foo.length > 0) {
        foo = foo.match(new RegExp(".{1,4}", "g")).join("-");
      }
      this.setState({
        reg_code: foo
      });
    }
  };

  onSubmitRegisterForm = event => {
    event.preventDefault(); // Don't refresh the page upon submit
    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      username: this.state.username,
      email: this.state.email,
      reg_code: this.state.reg_code,
      password: this.state.password,
      password_confirm: this.state.password_confirm
    };
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { error } = this.state.errors;
    const { loading } = this.props.auth;
    let content;
    loading
      ? (content = (
          <div className="main-div">
            <div className="panel">
              <div className="login-title" />
            </div>
            <LoaderSuccess
              msg={"Account created. Redirecting to login page."}
              margin="5vh 5vh"
            />
          </div>
        ))
      : (content = (
          <div>
            <div className="main-div">
              <div className="panel">
                <div className="login-title" />
              </div>
              <form id="Login" onSubmit={this.onSubmitRegisterForm}>
                <InputGroup
                  placeholder="First Name"
                  name="firstName"
                  type="text"
                  value={this.state.firstName}
                  icon="far fa-id-card"
                  onChange={this.changeInput}
                  error={error.firstName}
                />
                <InputGroup
                  placeholder="Last Name"
                  name="lastName"
                  type="text"
                  value={this.state.lastName}
                  icon="far fa-id-card"
                  onChange={this.changeInput}
                  error={error.lastName}
                />
                <InputGroup
                  placeholder="Username"
                  name="username"
                  type="text"
                  value={this.state.username}
                  icon="far fa-user"
                  onChange={this.changeInput}
                  error={error.username}
                />
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
                  placeholder="Registration Code"
                  name="reg_code"
                  type="text"
                  value={this.state.reg_code}
                  icon="fas fa-shield-alt"
                  onChange={this.changeInput}
                  maxLength="24"
                  error={error.reg_code}
                  regcode={true}
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
                <InputGroup
                  placeholder="Confirm Password"
                  name="password_confirm"
                  icon="fas fa-check-double"
                  type="password"
                  value={this.state.password_confirm}
                  onChange={this.changeInput}
                  error={error.password_confirm}
                />
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                <Link to="/auth/login" className="btn btn-primary">
                  Login
                </Link>
              </form>
            </div>
            <div className="auth-footer">
              <Link to="/" className="btn btn-primary">
                Home
              </Link>
            </div>
          </div>
        ));
    return (
      <div className="auth-container container">
        <div className="page-title">
          <img src={Logo} className="logo-auth" alt="Logo" />
        </div>
        <div className="auth-border" />
        <div className="login-form">{content}</div>
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
  { registerUser, clearErrors }
)(Register);
