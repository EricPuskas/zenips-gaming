// Dependencies
import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// Actions
import {
  newCookies,
  getCookies
} from "../../../../../../actions/settingsActions";
// Utilities
import isEmpty from "../../../../../../utils/isEmpty";
// Components
import LoaderLarge from "../../../../../Common/Loader/LoaderLarge";
import CookiesForm from "./CookiesForm";

class CookiesEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    document.title = "Zenips Gaming | Cookies";
    this.props.getCookies();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.settings.cookies) {
      const cookies = nextProps.settings.cookies;
      cookies.content = !isEmpty(cookies.content) ? cookies.content : "";
      this.setState({
        content: cookies.content
      });
    }
  }

  submitForm = event => {
    event.preventDefault();
    const data = {
      content: this.state.content
    };
    this.props.newCookies(data, this.props.history);
  };

  changeContent = content => {
    this.setState({ content });
  };

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { cookies, init_loading } = this.props.settings;
    const { content } = this.state;
    let { expandContent } = this.props;
    let mainContainer = classNames({
      "main-container": true,
      minContent: expandContent,
      maxContent: !expandContent
    });
    let cookies_form;
    if (cookies === null || init_loading || Object.keys(cookies).length === 0) {
      cookies_form = <LoaderLarge msg={"Loading Content. Please wait."} />;
    } else {
      cookies_form = (
        <CookiesForm
          changeContent={this.changeContent}
          submitForm={this.submitForm}
          action="update"
          content={content}
          goBack={this.goBack}
        />
      );
    }
    return <div className={mainContainer}>{cookies_form}</div>;
  }
}

CookiesEdit.propTypes = {
  settings: PropTypes.object.isRequired,
  newCookies: PropTypes.func.isRequired,
  getCookies: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  settings: state.settings
});

export default connect(
  mapStateToProps,
  { newCookies, getCookies }
)(withRouter(CookiesEdit));
