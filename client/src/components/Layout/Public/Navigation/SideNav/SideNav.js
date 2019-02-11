import React from "react";
import classNames from "classnames";
import "./SideNav.css";

const SideNav = ({ isOpen }) => {
  let sideDrawerClass = classNames({
    "side-drawer": true,
    open: isOpen
  });
  return (
    <nav className={sideDrawerClass}>
      <div className="side-d-scrollable">
        <div className="side-d-search-box">
          <input aria-label="search input" type="text" placeholder="Search" />
          <button aria-label="search button">
            <i className="fas fa-search" />
          </button>
        </div>
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
          <li>
            <button className="side-d-newsletter">
              <i className="fas fa-envelope" /> <span>Subscribe</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default SideNav;
