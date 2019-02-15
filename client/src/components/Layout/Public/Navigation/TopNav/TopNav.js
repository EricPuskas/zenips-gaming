import React from "react";
import ToggleButton from "../SideNav/ToggleButton";
import classNames from "classnames";
import Logo from "../../../../../assets/img/public_logo_orange.png";
import { Link } from "react-router-dom";
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
            <Link to="/">
              <img src={Logo} className="toolbar-logo-img" alt="Logo" />
            </Link>
          </div>
          <div className="toolbar-toggle-btn">
            <ToggleButton toggleNav={toggleNav} />
          </div>
          <div className="spacer" />
          <div className="toolbar-nav-items">
            <ul>
              <li>
                <Link to="/news">News</Link>
              </li>
              <li>
                <Link to="/reviews">Reviews</Link>
              </li>
              <li>
                <Link to="/guides">Guides</Link>
              </li>
              <li>
                <Link to="/videos">Videos</Link>
              </li>
              <li>
                <Link to="/contact">Contact us</Link>
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
                <Link to="/subscribe" className="subscribe-newsletter-btn">
                  <i className="fas fa-envelope" /> <span>Subscribe</span>
                </Link>
              </li>
              <li className="toolbar-search" onClick={() => toggleSearch()}>
                <button aria-label="Search Button" className={searchBtnClass}>
                  <i className="fas fa-search" />
                </button>
              </li>
              <li className={toolbarSearchClass}>
                <input
                  type="text"
                  ref={input => input && showSearch && input.focus()}
                  className={searchClass}
                  onChange={e => this.props.onSearchChange(e)}
                  placeholder="Search"
                  aria-label="Type here for search"
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
