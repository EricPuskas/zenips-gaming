import React from "react";
import ToggleButton from "../SideNav/ToggleButton";
import classNames from "classnames";
import Logo from "../../../../../assets/img/public_logo_orange.png";
import "./TopNav.css";

class TopNav extends React.Component {
  constructor() {
    super();
    this.state = {
      hideTopNav: false
    };
  }
  componentDidMount() {
    // window.addEventListener("wheel", this.handleWheel, false);
    this.setState({ hideTopNav: this.props.hideTopNav });
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.hideTopNav) {
      return { hideTopNav: nextProps.hideTopNav };
    } else return null;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.hideTopNav !== this.props.hideTopNav) {
      this.setState(() => ({ hideTopNav: this.props.hideTopNav }));
    }
  }
  render() {
    const { toggleNav, showSearch, toggleSearch } = this.props;

    let toolbarClass = classNames({
      toolbar: true,
      "toolbar-hide": this.state.hideTopNav
    });

    let searchClass = classNames({
      "toolbar-search-input": true,
      show: showSearch
    });
    let toolbarSearchClass = classNames({
      "toolbar-search": true,
      hide: !showSearch,
      show: showSearch
    });
    let searchBtnClass = classNames({
      "toolbar-search-btn": true,
      searching: showSearch
    });

    return (
      <header className={toolbarClass}>
        <nav className="toolbar-nav">
          <div className="toolbar-logo">
            <a href="/">
              <img src={Logo} className="toolbar-logo-img" alt="Logo" />
            </a>
          </div>
          <div className="toolbar-toggle-btn">
            <ToggleButton toggleNav={toggleNav} />
          </div>
          <div className="spacer" />
          <div className="toolbar-nav-items">
            <ul>
              <li>
                <a href="/">News</a>
              </li>
              <li>
                <a href="/">Reviews</a>
              </li>
              <li>
                <a href="/">Guides</a>
              </li>
              <li>
                <a href="/">Videos</a>
              </li>
              <li>
                <a href="/">Contact us</a>
              </li>
              <li>
                <a href="/">Patreon</a>
              </li>
            </ul>
          </div>
          <div className="spacer" />
          <div className="toolbar-nav-items">
            <ul>
              <li className="subscribe-newsletter">
                <button className="subscribe-newsletter-btn">
                  <i className="fas fa-envelope" /> <span>Subscribe</span>
                </button>
              </li>
              <li className="toolbar-search" onClick={() => toggleSearch()}>
                <button className={searchBtnClass}>
                  <i className="fas fa-search" />
                </button>
              </li>
              <li className={toolbarSearchClass}>
                <input
                  type="text"
                  ref={input => input && showSearch && input.focus()}
                  className={searchClass}
                  placeholder="Search"
                />
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}
export default TopNav;
