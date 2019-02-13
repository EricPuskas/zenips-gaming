import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import "./SideNav.css";
class SideNav extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      search: ""
    };
  }

  escapeRegex = text => {
    return text.replace(/[\s]/g, "+");
  };

  onSearchChange = event => {
    let search = event.target.value;
    this.setState({ search });
  };

  onSearchSubmit = () => {
    if (this.state.search !== "") {
      let search_query = this.escapeRegex(this.state.search);
      this.props.history.push(`/articles/results?search_query=${search_query}`);
      this.props.toggleNav();
    }
  };
  render() {
    const { isOpen } = this.props;
    let sideDrawerClass = classNames({
      "side-drawer": true,
      open: isOpen
    });
    return (
      <nav className={sideDrawerClass}>
        <div className="side-d-scrollable">
          <div className="side-d-search-box">
            <input
              onChange={e => this.onSearchChange(e)}
              aria-label="search input"
              type="text"
              placeholder="Search"
            />
            <button
              onClick={() => this.onSearchSubmit()}
              aria-label="search button"
            >
              <i className="fas fa-search" />
            </button>
          </div>
          <ul>
            <Link to="/news">
              <li>News</li>
            </Link>
            <Link to="/reviews">
              <li>Reviews</li>
            </Link>
            <Link to="/guides">
              <li>Guides</li>
            </Link>
            <li>
              <a href="/">Videos</a>
            </li>
            <Link to="/contact">
              <li>Contact us</li>
            </Link>
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
  }
}

export default withRouter(SideNav);
