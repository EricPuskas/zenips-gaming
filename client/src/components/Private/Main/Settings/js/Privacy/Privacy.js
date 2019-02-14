import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
// Actions
import {
  getPrivacy,
  deletePrivacy
} from "../../../../../../actions/settingsActions";
import LoaderLarge from "../../../../../Common/Loader/LoaderLarge";
import PrivacyContent from "./PrivacyContent";
import "../../css/Settings.css";

class Privacy extends PureComponent {
  componentDidMount() {
    document.title = "Zenips Gaming | Settings";
    this.props.getPrivacy();
  }

  goToLink = str => {
    this.props.history.push(`/dashboard/settings/${str}`);
  };

  render() {
    const { init_loading, privacy_policy } = this.props.settings;
    const { expandContent } = this.props;
    let mainContainer = classNames({
      "main-container": true,
      minContent: expandContent,
      maxContent: !expandContent
    });
    let content;
    init_loading || Object.keys(privacy_policy).length === 0
      ? (content = (
          <LoaderLarge msg={"Loading Content. Please wait."} margin="0" />
        ))
      : (content = (
          <PrivacyContent
            privacy_policy={privacy_policy}
            deletePrivacy={this.props.deletePrivacy}
          />
        ));
    return (
      <div className={mainContainer}>
        <div className="row">
          <div className="col-12 text-center">
            <h1>
              <i className="fas fa-cogs" /> Settings
            </h1>
            <div className="settings-buttons">
              <ol className="tab-list">
                <li
                  onClick={() => this.goToLink("about")}
                  className="tab-list-item"
                >
                  About Page
                </li>
                <li className="tab-list-item tab-list-active">
                  Privacy Policy
                </li>
                <li
                  onClick={() => this.goToLink("terms")}
                  className="tab-list-item"
                >
                  Terms of Use
                </li>
                <li
                  onClick={() => this.goToLink("cookies")}
                  className="tab-list-item"
                >
                  Cookies
                </li>
              </ol>
            </div>
          </div>
          <div className="col-12 col-lg-8 col-xl-8 center-div text-center">
            <div className="content-box">
              <h1> Privacy Policy </h1>
              {content}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Privacy.propTypes = {
  settings: PropTypes.object.isRequired,
  getPrivacy: PropTypes.func.isRequired,
  deletePrivacy: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  settings: state.settings
});

export default connect(
  mapStateToProps,
  { getPrivacy, deletePrivacy }
)(withRouter(Privacy));
