import React, { PureComponent } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import PropTypes from "prop-types";
// Actions
import {
  getInitGuides,
  getMoreGuides
} from "../../../../actions/articleActions";

// Components
import GuidesFeed from "./GuidesFeed";
import LoaderRolling from "../../../Common/Loader/LoaderRolling";
import LoaderSmall from "../../../Common/Loader/LoaderSmall";
import ScrollToTop from "../../../Common/ScrollToTop/ScrollToTop";
import Navigation from "../../../Layout/Public/Navigation/Navigation";
import Footer from "../../../Layout/Public/Footer/Footer";

//CSS
import "../Home/css/Home.css";
let lastScrollTop = 0;
class Guides extends PureComponent {
  constructor() {
    super();
    this.state = {
      mobile: false,
      large_screen: false,
      hideScrollTopButton: true,
      expandContent: false,
      hideFooter: false,
      hideTopNav: false,
      search: "",
      display_update: false
    };
  }
  componentDidMount() {
    document.title = "Zenips Gaming | News";
    // Handle global event.
    window.addEventListener("newContentAvailable", () => {
      this.setState({
        display_update: true
      });
    });
    window.innerWidth <= 813 &&
      this.setState(prevState => {
        return { mobile: !prevState.mobile };
      });

    window.innerWidth >= 1024 &&
      window.innerWidth < 1537 &&
      this.setState(prevState => {
        return { large_screen: !prevState.large_screen };
      });

    this.props.getInitGuides(3, 1);
  }

  onClick = () => {
    // Reload when modal click.
    window.location.reload(window.location.href);
  };

  handleScroll = (e, scrolling, totalPages, page, per) => {
    e.stopPropagation();
    const container = document.getElementById("container");
    const offset = document.getElementById("offset");
    const target = document.getElementById("target");
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
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    if (container && offset && target) {
      container.scrollTop <= 1100 &&
        container.scrollTop > 400 &&
        this.setState({ hideScrollTopButton: false });

      container.scrollTop <= 400 &&
        container.scrollTop >= 100 &&
        this.setState({ hideScrollTopButton: true });

      if (scrolling) return;
      if (totalPages <= page) return;

      const targetOffset = target.offsetTop;
      const containerOffset = container.offsetTop + container.clientHeight;
      const pageOffset = container.scrollTop + offset.offsetTop;

      let result = pageOffset + containerOffset;
      if (result > targetOffset + (container.offsetTop - 700)) {
        this.props.getMoreGuides(per, page + 1);
      }
    }
  };

  render() {
    const container = document.getElementById("container");
    const {
      scrolling,
      totalPages,
      page,
      articles,
      loading,
      init_loading
    } = this.props.articles;
    let endLoad, loader_icon, main;
    let contentClass = classNames({
      "content-container": true,
      expand: this.state.expandContent
    });

    loading ? (loader_icon = <LoaderSmall />) : (loader_icon = "");

    if (articles.length > 0 && totalPages === page && page > 1 && !loading) {
      endLoad = <div className="fadeInEnd">You've reached the end.</div>;
    }

    init_loading
      ? (main = (
          <LoaderRolling
            msg={"Loading Articles..."}
            textColor="#1f272b"
            margin="50px auto"
          />
        ))
      : (main = <GuidesFeed articles={articles} />);
    return (
      <div>
        <Navigation hideTopNav={this.state.hideTopNav} />
        <div className="wrapper_main">
          <div
            id="container"
            onScroll={e => this.handleScroll(e, scrolling, totalPages, page, 3)}
            className={contentClass}
          >
            <div id="offset">
              <div className="row">
                <div className="col-12 col-lg-2 col-xl-2 reset-padding" />
                <div className="col-12 col-lg-8 col-xl-8 reset-padding">
                  {main}
                  {loader_icon}
                </div>
                <div className="col-12 col-lg-2 col-xl-2 reset-padding" />
              </div>

              {endLoad}
              <div id="target">
                <ScrollToTop
                  customScroll={true}
                  hideScrollTopButton={this.state.hideScrollTopButton}
                  container={container}
                  scrollStepInPx="20"
                  delayInMs="1"
                />
              </div>
            </div>
          </div>
        </div>
        <Footer hideFooter={this.state.hideFooter} />
      </div>
    );
  }
}

Guides.propTypes = {
  articles: PropTypes.object.isRequired,
  getInitGuides: PropTypes.func.isRequired,
  getMoreGuides: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  articles: state.articles
});

export default connect(
  mapStateToProps,
  { getInitGuides, getMoreGuides }
)(Guides);
