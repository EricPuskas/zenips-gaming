/* eslint-disable */
import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import "./Footer.css";

class Footer extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
      hide: false
    };
  }
  componentDidMount() {
    // window.addEventListener("wheel", this.handleWheel, false);
    this.setState({ hide: this.props.hideFooter });
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.hideFooter) {
      return { hide: nextProps.hideFooter };
    } else return null;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.hideFooter !== this.props.hideFooter) {
      this.setState(() => ({ hide: this.props.hideFooter }));
      if (this.props.hideFooter === true) {
        this.setState(() => ({ expanded: false }));
      }
    }
  }

  toggleExpFooter = () => {
    this.setState(prevState => {
      return {
        expanded: !prevState.expanded
      };
    });
  };

  handleWheel = e => {
    if (e.wheelDelta < 0) {
      this.setState({ hide: true });
    }

    if (e.wheelDelta > 0) {
      this.setState({ hide: false });
    }
  };

  render() {
    let extendedFooter = classNames({
      "extended-footer": true,
      show: this.state.expanded
    });
    let baseFooter = classNames({
      "base-footer": true,
      hide: this.state.hide
    });

    let expandIcon = classNames({
      "fas fa-expand": !this.state.expanded,
      "fas fa-minus": this.state.expanded
    });

    return (
      <footer className="footer">
        <div className={extendedFooter}>
          <div className="footer-menu" aria-hidden={true}>
            <ul>
              <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms">Terms of Use</Link>
              </li>
              <li>
                <Link to="/cookies">Cookies</Link>
              </li>
              <li>
                <Link to="/about">About us</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="footer-menu-social-media">
            <ul>
              <li className="fb-icon">
                <i className="fab fa-facebook-f" />
              </li>
              <li className="twitter-icon">
                <i className="fab fa-twitter" />
              </li>
              <li className="insta-icon">
                <i className="fab fa-instagram" />
              </li>
              <li className="yt-icon">
                <i className="fab fa-youtube" />
              </li>
            </ul>
          </div>
        </div>
        <div className={baseFooter}>
          <span>
            &copy; {new Date().getFullYear()} Copyright. Zenips Studios
          </span>
          <i className={expandIcon} onClick={() => this.toggleExpFooter()} />
        </div>
      </footer>
    );
  }
}

export default Footer;
