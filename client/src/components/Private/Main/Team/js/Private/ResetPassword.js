import React, { Component } from "react";
import axios from "axios";
import classNames from "classnames";
import InputGroup from "../../../../../Common/InputGroup";
import LoaderSuccess from "../../../../../Common/Loader/LoaderSuccess";
import { withRouter, Link } from "react-router-dom";
import { updatePassword } from "../../../../../../actions/memberActions";
import { connect } from "react-redux";
class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      username: "",
      password: "",
      password_confirm: "",
      errors: {},
      token: ""
    };
  }
  changeInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

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

  submitForm = event => {
    event.preventDefault();
    const data = {
      password: this.state.password,
      password_confirm: this.state.password_confirm,
      token: this.state.token
    };
    this.props.updatePassword(this.state.id, data, this.props.history);
  };

  render() {
    let { expandContent } = this.props;
    let { reset_pw } = this.props.member;
    let content;
    let mainContainer = classNames({
      "main-container": true,
      minContent: expandContent,
      maxContent: !expandContent
    });

    const { password_confirm, password, username } = this.state;
    const { error } = this.state.errors;
    content = (
      <div className="text-center">
        <h1>Change your password</h1>
        {error.error_message && <h1>error.error_message</h1>}
        <form onSubmit={this.submitForm}>
          <div className="col-12 col-lg-6 col-xl-6 center-div">
            <input type="hidden" name="username" value={username} />
            <InputGroup
              placeholder="Password"
              name="password"
              icon="fas fa-lock"
              type="password"
              value={password}
              onChange={this.changeInput}
              error={error.password}
            />
            <InputGroup
              placeholder="Confirm Password"
              name="password_confirm"
              icon="fas fa-check-double"
              type="password"
              value={password_confirm}
              onChange={this.changeInput}
              error={error.password_confirm}
            />
          </div>
          <div className="col-12 text-center" style={{ paddingBottom: "15px" }}>
            <Link to={`/dashboard/team/${username}`}>
              <button className="btn btn-primary btn-lg">
                <i className="fas fa-arrow-circle-left" /> Back
              </button>
            </Link>
            <button type="submit" className="btn btn-green-d">
              <i className="fas fa-check-circle" /> Update Password
            </button>
          </div>
        </form>
      </div>
    );

    if (reset_pw)
      content = (
        <LoaderSuccess msg={"Your password has been changed."} margin="5vh" />
      );
    return (
      <div className={mainContainer}>
        <div className="row">
          <div className="col-6 center-div">{content}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  member: state.member
});

export default connect(
  mapStateToProps,
  { updatePassword }
)(withRouter(ResetPassword));
