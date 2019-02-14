import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";
// Actions
import { getCookies } from "../../../../actions/settingsActions";
import LoaderRolling from "../../../Common/Loader/LoaderRolling";
import CookiesContent from "./CookiesContent";
import Navigation from "../../../Layout/Public/Navigation/Navigation";
import Footer from "../../../Layout/Public/Footer/Footer";
let lastScrollTop = 0;
class Cookies extends PureComponent {
  constructor() {
    super();
    this.state = {
      hideScrollTopButton: true,
      expandContent: false,
      hideFooter: false,
      hideTopNav: false,
      display_update: false
    };
  }
  componentDidMount() {
    document.title = "Zenips Gaming | Cookies Policy";
    window.addEventListener("newContentAvailable", () => {
      this.setState({
        display_update: true
      });
    });
    this.props.getCookies();
  }

  handleScroll = e => {
    e.stopPropagation();
    const container = document.getElementById("container");
    let st = window.pageYOffset || container.scrollTop;

    if (st > lastScrollTop) {
      // downscroll code
      if (this.state.hideFooter === false) {
        this.setState({
          expandContent: true,
          hideFooter: true,
          hideTopNav: true
        });
      }
    } else {
      // upscroll code
      if (this.state.hideFooter === true) {
        this.setState({
          expandContent: false,
          hideFooter: false,
          hideTopNav: false
        });
      }
    }
    lastScrollTop = st <= 0 ? 0 : st;
  };

  render() {
    const { init_loading, cookies } = this.props.settings;
    let contentClass = classNames({
      "content-container": true,
      expand: this.state.expandContent
    });
    let content;
    init_loading || Object.keys(cookies).length === 0
      ? (content = (
          <LoaderRolling
            msg={"Loading Content. Please wait."}
            textColor="#1f272b"
            margin="50px auto"
          />
        ))
      : (content = <CookiesContent cookies={cookies} />);

    return (
      <div>
        <Navigation hideTopNav={this.state.hideTopNav} />
        <div className="wrapper_main">
          <div
            id="container"
            onScroll={e => this.handleScroll(e)}
            className={contentClass}
          >
            <div className="row">
              <div className="col-12 col-lg-8 col-xl-8 center-div text-center">
                <div className="content-box">
                  <h1> Cookies Policy </h1>
                  {content}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer hideFooter={this.state.hideFooter} />
      </div>
    );
  }
}

Cookies.propTypes = {
  settings: PropTypes.object.isRequired,
  getCookies: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  settings: state.settings
});

export default connect(
  mapStateToProps,
  { getCookies }
)(Cookies);
