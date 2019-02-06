import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { updatePasswordPublic, clearErrors } from "../../actions/memberActions";
import InputGroup from "../Common/InputGroup";
import Logo from "../../assets/img/logo.png";
import LoaderSuccess from "../Common/Loader/LoaderSuccess";
import axios from "axios";
import "./Auth.css";

class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      username: "",
      password: "",
      password_confirm: "",
      token: "",
      errors: {}
    };
  }

  async componentDidMount() {
    let token = this.props.match.params.token;
    await axios.get(`/api/users/reset/${token}`).then(res => {
      if (res.data.message === "Token is valid.") {
        this.setState({
          id: res.data.id,
          username: res.data.username,
          token
        });
      } else {
        this.setState({
          errors: {
            error: {
              error_message: res.data.message
            }
          }
        });
      }
    });
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

  submitForm = event => {
    event.preventDefault();
    const data = {
      password: this.state.password,
      password_confirm: this.state.password_confirm,
      token: this.state.token
    };
    this.props.updatePasswordPublic(this.state.id, data, this.props.history);
  };

  render() {
    const { error } = this.state.errors;
    const { reset_pw } = this.props.member;
    const { password_confirm, password, username } = this.state;
    let content;
    content = (
      <div className="text-center" style={{ paddingTop: "2rem" }}>
        {error.error_message && <h1>error.error_message</h1>}
        <form onSubmit={this.submitForm}>
          <input type="hidden" name="username" value={username} />
          <InputGroup
            placeholder="New Password"
            name="password"
            icon="fas fa-lock"
            type="password"
            value={password}
            onChange={this.changeInput}
            error={error.password}
          />
          <InputGroup
            placeholder="Confirm New Password"
            name="password_confirm"
            icon="fas fa-check-double"
            type="password"
            value={password_confirm}
            onChange={this.changeInput}
            error={error.password_confirm}
          />
          <button type="submit" className="btn btn-primary">
            Update My Password
          </button>
        </form>
      </div>
    );

    if (reset_pw)
      content = (
        <LoaderSuccess
          msg={"Your password has been changed."}
          margin="5vh 5vh"
        />
      );

    return (
      <div className="auth-container container">
        <div className="page-title">
          <img src={Logo} className="logo-auth" alt="Logo" />
        </div>
        <div className="auth-border" />
        <div className="login-form">
          <div className="main-div">{content}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  member: state.member,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { updatePasswordPublic, clearErrors }
)(withRouter(ResetPassword));
