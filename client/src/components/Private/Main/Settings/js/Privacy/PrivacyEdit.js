// Dependencies
import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// Actions
import {
  newPrivacy,
  getPrivacy
} from "../../../../../../actions/settingsActions";
// Utilities
import isEmpty from "../../../../../../utils/isEmpty";
// Components
import LoaderLarge from "../../../../../Common/Loader/LoaderLarge";
import PrivacyForm from "./PrivacyForm";

class PrivacyEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    document.title = "Zenips Gaming | Privacy";
    this.props.getPrivacy();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.settings.privacy_policy) {
      const privacy_policy = nextProps.settings.privacy_policy;
      privacy_policy.content = !isEmpty(privacy_policy.content)
        ? privacy_policy.content
        : "";
      this.setState({
        content: privacy_policy.content
      });
    }
  }

  submitForm = event => {
    event.preventDefault();
    const data = {
      content: this.state.content
    };
    this.props.newPrivacy(data, this.props.history);
  };

  changeContent = content => {
    this.setState({ content });
  };

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { privacy_policy, init_loading } = this.props.settings;
    const { content } = this.state;
    let { expandContent } = this.props;
    let mainContainer = classNames({
      "main-container": true,
      minContent: expandContent,
      maxContent: !expandContent
    });
    let privacy_policy_form;
    if (
      privacy_policy === null ||
      init_loading ||
      Object.keys(privacy_policy).length === 0
    ) {
      privacy_policy_form = (
        <LoaderLarge msg={"Loading Content. Please wait."} />
      );
    } else {
      privacy_policy_form = (
        <PrivacyForm
          changeContent={this.changeContent}
          submitForm={this.submitForm}
          action="update"
          content={content}
          goBack={this.goBack}
        />
      );
    }
    return <div className={mainContainer}>{privacy_policy_form}</div>;
  }
}

PrivacyEdit.propTypes = {
  settings: PropTypes.object.isRequired,
  newPrivacy: PropTypes.func.isRequired,
  getPrivacy: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  settings: state.settings
});

export default connect(
  mapStateToProps,
  { newPrivacy, getPrivacy }
)(withRouter(PrivacyEdit));
