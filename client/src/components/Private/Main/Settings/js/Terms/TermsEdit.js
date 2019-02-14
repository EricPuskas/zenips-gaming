// Dependencies
import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// Actions
import { newTerms, getTerms } from "../../../../../../actions/settingsActions";
// Utilities
import isEmpty from "../../../../../../utils/isEmpty";
// Components
import LoaderLarge from "../../../../../Common/Loader/LoaderLarge";
import TermsForm from "./TermsForm";

class TermsEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    document.title = "Zenips Gaming | Terms of Use";
    this.props.getTerms();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.settings.terms_of_use) {
      const terms_of_use = nextProps.settings.terms_of_use;
      terms_of_use.content = !isEmpty(terms_of_use.content)
        ? terms_of_use.content
        : "";
      this.setState({
        content: terms_of_use.content
      });
    }
  }

  submitForm = event => {
    event.preventDefault();
    const data = {
      content: this.state.content
    };
    this.props.newTerms(data, this.props.history);
  };

  changeContent = content => {
    this.setState({ content });
  };

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { terms_of_use, init_loading } = this.props.settings;
    const { content } = this.state;
    let { expandContent } = this.props;
    let mainContainer = classNames({
      "main-container": true,
      minContent: expandContent,
      maxContent: !expandContent
    });
    let terms_of_use_form;
    if (
      terms_of_use === null ||
      init_loading ||
      Object.keys(terms_of_use).length === 0
    ) {
      terms_of_use_form = <LoaderLarge msg={"Loading Content. Please wait."} />;
    } else {
      terms_of_use_form = (
        <TermsForm
          changeContent={this.changeContent}
          submitForm={this.submitForm}
          action="update"
          content={content}
          goBack={this.goBack}
        />
      );
    }
    return <div className={mainContainer}>{terms_of_use_form}</div>;
  }
}

TermsEdit.propTypes = {
  settings: PropTypes.object.isRequired,
  newTerms: PropTypes.func.isRequired,
  getTerms: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  settings: state.settings
});

export default connect(
  mapStateToProps,
  { newTerms, getTerms }
)(withRouter(TermsEdit));
