import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
// Actions
import {
  getCookies,
  deleteCookies
} from "../../../../../../actions/settingsActions";
import LoaderLarge from "../../../../../Common/Loader/LoaderLarge";
import CookiesContent from "./CookiesContent";
import "../../css/Settings.css";

class Cookies extends PureComponent {
  componentDidMount() {
    document.title = "Zenips Gaming | Settings";
    this.props.getCookies();
  }

  goToLink = str => {
    this.props.history.push(`/dashboard/settings/${str}`);
  };

  render() {
    const { init_loading, cookies } = this.props.settings;
    const { expandContent } = this.props;
    let mainContainer = classNames({
      "main-container": true,
      minContent: expandContent,
      maxContent: !expandContent
    });
    let content;
    init_loading || Object.keys(cookies).length === 0
      ? (content = (
          <LoaderLarge msg={"Loading Content. Please wait."} margin="0" />
        ))
      : (content = (
          <CookiesContent
            cookies={cookies}
            deleteCookies={this.props.deleteCookies}
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
                <li
                  onClick={() => this.goToLink("terms")}
                  className="tab-list-item"
                >
                  Terms of Use
                </li>
                <li className="tab-list-item tab-list-active">Cookies</li>
              </ol>
            </div>
          </div>
          <div className="col-12 col-lg-8 col-xl-8 center-div text-center">
            <div className="content-box">
              <h1> Cookies Policy </h1>
              {content}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Cookies.propTypes = {
  settings: PropTypes.object.isRequired,
  getCookies: PropTypes.func.isRequired,
  deleteCookies: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  settings: state.settings
});

export default connect(
  mapStateToProps,
  { getCookies, deleteCookies }
)(withRouter(Cookies));
