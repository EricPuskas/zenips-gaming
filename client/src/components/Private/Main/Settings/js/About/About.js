import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
// Actions
import {
  getAbout,
  deleteAbout
} from "../../../../../../actions/settingsActions";
import LoaderLarge from "../../../../../Common/Loader/LoaderLarge";
import AboutContent from "./AboutContent";
import "../../css/Settings.css";

class About extends PureComponent {
  componentDidMount() {
    document.title = "Zenips Gaming | Settings";
    this.props.getAbout();
  }

  goToLink = str => {
    this.props.history.push(`/dashboard/settings/${str}`);
  };

  render() {
    const { init_loading, about } = this.props.settings;
    const { expandContent } = this.props;
    let mainContainer = classNames({
      "main-container": true,
      minContent: expandContent,
      maxContent: !expandContent
    });
    let content;
    init_loading || Object.keys(about).length === 0
      ? (content = (
          <LoaderLarge msg={"Loading Content. Please wait."} margin="0" />
        ))
      : (content = (
          <AboutContent about={about} deleteAbout={this.props.deleteAbout} />
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
                <li className="tab-list-item tab-list-active">About Page</li>
                <li
                  onClick={() => this.goToLink("privacy")}
                  className="tab-list-item"
                >
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
              <h1> About us </h1>
              {content}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

About.propTypes = {
  settings: PropTypes.object.isRequired,
  getAbout: PropTypes.func.isRequired,
  deleteAbout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  settings: state.settings
});

export default connect(
  mapStateToProps,
  { getAbout, deleteAbout }
)(withRouter(About));
