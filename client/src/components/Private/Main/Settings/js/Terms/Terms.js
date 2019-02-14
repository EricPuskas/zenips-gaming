import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
// Actions
import {
  getTerms,
  deleteTerms
} from "../../../../../../actions/settingsActions";
import LoaderLarge from "../../../../../Common/Loader/LoaderLarge";
import TermsContent from "./TermsContent";
import "../../css/Settings.css";

class Terms extends PureComponent {
  componentDidMount() {
    document.title = "Zenips Gaming | Settings";
    this.props.getTerms();
  }

  goToLink = str => {
    this.props.history.push(`/dashboard/settings/${str}`);
  };

  render() {
    const { init_loading, terms_of_use } = this.props.settings;
    const { expandContent } = this.props;
    let mainContainer = classNames({
      "main-container": true,
      minContent: expandContent,
      maxContent: !expandContent
    });
    let content;
    init_loading || Object.keys(terms_of_use).length === 0
      ? (content = (
          <LoaderLarge msg={"Loading Content. Please wait."} margin="0" />
        ))
      : (content = (
          <TermsContent
            terms_of_use={terms_of_use}
            deleteTerms={this.props.deleteTerms}
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
                <li
                  onClick={() => this.goToLink("privacy")}
                  className="tab-list-item"
                >
                  Privacy Policy
                </li>
                <li className="tab-list-item tab-list-active">Terms of Use</li>
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
              <h1> Terms of Use </h1>
              {content}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Terms.propTypes = {
  settings: PropTypes.object.isRequired,
  getTerms: PropTypes.func.isRequired,
  deleteTerms: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  settings: state.settings
});

export default connect(
  mapStateToProps,
  { getTerms, deleteTerms }
)(withRouter(Terms));
