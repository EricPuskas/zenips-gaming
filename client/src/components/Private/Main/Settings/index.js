import React, { Component } from "react";
import classNames from "classnames";
import Tabs from "../../../Common/Tabs/Tabs";
import About from "./js/About/About";
import "./css/Settings.css";

class Settings extends Component {
  componentDidMount() {
    document.title = "Zenips Gaming | Settings";
  }

  render() {
    const { expandContent } = this.props;
    let mainContainer = classNames({
      "main-container": true,
      minContent: expandContent,
      maxContent: !expandContent
    });

    return (
      <div className={mainContainer}>
        <div className="row">
          <div className="col-12 text-center">
            <h1>
              <i className="fas fa-cogs" /> Settings
            </h1>
            <Tabs>
              <div label="About Page">
                <h1> About Page </h1>
                <About />
              </div>
              <div label="Privacy Policy">
                <h1>Privacy Policy</h1>
              </div>
              <div label="Terms of Use">
                <h1>Terms of Use</h1>
              </div>
              <div label="Cookies">
                <h1>Cookies</h1>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;
