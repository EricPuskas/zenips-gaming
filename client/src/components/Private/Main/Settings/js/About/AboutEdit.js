// Dependencies
import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// Actions
import { newAbout, getAbout } from "../../../../../../actions/settingsActions";
// Utilities
import isEmpty from "../../../../../../utils/isEmpty";
// Components
import LoaderLarge from "../../../../../Common/Loader/LoaderLarge";
import AboutForm from "./AboutForm";

class AboutEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    document.title = "Zenips Gaming | About";
    this.props.getAbout();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.settings.about) {
      const about = nextProps.settings.about;
      about.content = !isEmpty(about.content) ? about.content : "";
      this.setState({
        content: about.content
      });
    }
  }

  submitForm = event => {
    event.preventDefault();
    const data = {
      content: this.state.content
    };
    this.props.newAbout(data, this.props.history);
  };

  changeContent = content => {
    this.setState({ content });
  };

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { about, init_loading } = this.props.settings;
    const { content } = this.state;
    let { expandContent } = this.props;
    let mainContainer = classNames({
      "main-container": true,
      minContent: expandContent,
      maxContent: !expandContent
    });
    let about_form;
    if (about === null || init_loading || Object.keys(about).length === 0) {
      about_form = <LoaderLarge msg={"Loading Content. Please wait."} />;
    } else {
      about_form = (
        <AboutForm
          changeContent={this.changeContent}
          submitForm={this.submitForm}
          action="update"
          content={content}
          goBack={this.goBack}
        />
      );
    }
    return <div className={mainContainer}>{about_form}</div>;
  }
}

AboutEdit.propTypes = {
  settings: PropTypes.object.isRequired,
  newAbout: PropTypes.func.isRequired,
  getAbout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  settings: state.settings
});

export default connect(
  mapStateToProps,
  { newAbout, getAbout }
)(withRouter(AboutEdit));
