import React, { PureComponent } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
// Actions
import {
  getInitArticles,
  getMoreArticles
} from "../../../../actions/articleActions";
import ArticlesFeed from "./js/Articles/ArticlesFeed";
import LoaderRolling from "../../../Common/Loader/LoaderRolling";
import LoaderSmall from "../../../Common/Loader/LoaderSmall";
import ScrollToTop from "../../../Common/ScrollToTop/ScrollToTop";
import Navigation from "../../../Layout/Public/Navigation/Navigation";
import Footer from "../../../Layout/Public/Footer/Footer";
import "./css/Home.css";
let lastScrollTop = 0;
class Home extends PureComponent {
  constructor() {
    super();
    this.state = {
      mobile: false,
      hideScrollTopButton: true,
      expandContent: false,
      hideFooter: false,
      hideTopNav: false,
      search: ""
    };
  }
  componentDidMount() {
    document.title = "Zenips Gaming | Home";
    if (window.innerWidth <= 813) {
      this.setState(prevState => {
        return { mobile: !prevState.mobile };
      });
    }
    const { per, page } = this.props.articles;
    this.props.getInitArticles(per, page, this.state.search);
  }

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
        this.props.getMoreArticles(per, page + 1, this.state.search);
      }
    }
  };

  render() {
    const container = document.getElementById("container");
    const {
      scrolling,
      totalPages,
      page,
      per,
      articles,
      loading,
      init_loading
    } = this.props.articles;
    let endLoad, loader_icon, side;
    let main = <ArticlesFeed articles={articles} />;
    this.state.mobile
      ? (side = "")
      : (side = (
          <div className="ads-container">
            <div className="advertisement">
              <span>Advertisement</span>
              <img
                className="img-responsive"
                src="https://s3.envato.com/files/224287130/300x600.jpg"
                alt="Advertisement"
              />
            </div>
            <div className="advertisement">
              <span>Advertisement</span>
              <img
                className="img-responsive"
                src="http://visarity-ad-pakfiles.s3.amazonaws.com/web/images/v3ad-a078-89f3-824b-61897_regular.jpg"
                alt="Advertisement"
              />
            </div>
          </div>
        ));
    if (articles.length > 0 && totalPages === page && page > 1 && !loading) {
      endLoad = <div className="fadeInEnd">You've reached the end.</div>;
    }
    if (totalPages === page && page > 1 && !loading) {
      side = (
        <div className="ads-container">
          <div className="advertisement">
            <span>Advertisement</span>
            <img
              className="img-responsive"
              src="https://s3.envato.com/files/224287130/300x600.jpg"
              alt="Advertisement"
            />
          </div>
          <div className="advertisement">
            <span>Advertisement</span>
            <img
              className="img-responsive"
              src="http://visarity-ad-pakfiles.s3.amazonaws.com/web/images/v3ad-a078-89f3-824b-61897_regular.jpg"
              alt="Advertisement"
            />
          </div>
        </div>
      );

      endLoad = <div className="fadeInEnd">You've reached the end.</div>;
    }
    loading ? (loader_icon = <LoaderSmall />) : (loader_icon = "");

    if (articles === null || init_loading) {
      main = (
        <LoaderRolling msg={"Loading data. Please wait."} margin="50px auto" />
      );
    }

    let contentContainer = classNames({
      "content-container": true,
      expand: this.state.expandContent
    });

    let bigContainer;
    if (articles === null || init_loading) {
      bigContainer = (
        <LoaderRolling msg={"Loading... Please wait."} margin="50px auto" />
      );
    } else {
      bigContainer = (
        <div>
          <Navigation hideTopNav={this.state.hideTopNav} />
          <div className="wrapper_main">
            <div
              id="container"
              onScroll={e =>
                this.handleScroll(e, scrolling, totalPages, page, per)
              }
              className={contentContainer}
            >
              <div id="offset">
                <div className="row bottom-bar">
                  <div className="col-12 col-lg-7 col-xl-7">
                    <div className="latest-post-container text-center">
                      <h1>Latest Video</h1>
                      <div className="embed-responsive embed-responsive-16by9">
                        <div
                          className="yt-player"
                          data-id="i3GmVHYoJNY"
                          data-related="0"
                          data-control="1"
                          data-info="1"
                          data-fullscreen="1"
                        >
                          <img
                            src="https://res.cloudinary.com/zenipsstudio/image/upload/v1548671129/bfnze8ehqeuwimc8lqzr.jpg"
                            alt="youtube video"
                          />
                          <div className="yt-player-control">&nbsp;</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-5 col-xl-5 side-bar">
                    <div className="top-article-container text-center">
                      <h1>Article of the week!</h1>
                      <h1 className="latest-post-title text-center">
                        Witcher 3 - Halloween stuff
                      </h1>
                      <div className="article-info-div text-center">
                        <div className="article-info-itm">
                          <img
                            src="https://res.cloudinary.com/zenipsstudio/image/upload/v1548105509/a1xet3uflgxvrz5gurdy.png"
                            alt="Author Avatar"
                            className="img-responsive author-avatar-small"
                          />
                          <span>Eric Puskas</span>
                        </div>
                        <div className="article-info-itm text-center">
                          <i className="far fa-clock" />
                          <span>Feb 04 - 2:13 AM</span>
                        </div>
                        <div className="article-info-itm text-center">
                          <i className="fas fa-tag" />
                          <span>Event</span>
                        </div>
                      </div>
                      <img
                        src="https://res.cloudinary.com/zenipsstudio/image/upload/v1548950113/fkk9rgdpq8qbf92mlmk4.png"
                        alt="Thumbnail"
                        className="img-responsive article-thumbnail"
                      />
                      <p>
                        Assassin’s Creed Odyssey is juggling a lot. It flirts
                        with comedy and tragedy, serves up the stealth that the
                        series is known for, and overhauls and improves
                        straightforward melee combat. Assassin’s C...
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-lg-2 col-xl-2">
                    <div className="ads-container">
                      <div className="advertisement">
                        <span>Advertisement</span>
                        <img
                          className="img-responsive"
                          src="https://www.patriotsandpaws.org/wp-content/uploads/2018/06/OCCF-EV-Stand-and-Salute-2018-Web-Ads-300x600-01.png"
                          alt="Advertisement"
                        />
                      </div>
                      <div className="advertisement">
                        <span>Advertisement</span>
                        <img
                          className="img-responsive"
                          src="https://456e6419cd3deedfcb01-f77d790b25275a0acf47e2933ac91fce.ssl.cf2.rackcdn.com/da73b65a0d79fb2a062552c1eee4134b.jpeg"
                          alt="Advertisement"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-8 col-xl-8">
                    <h1 className="text-center">Recent Articles</h1>
                    <div className="main-holder">
                      {main}
                      {loader_icon}
                    </div>
                  </div>
                  <div className="col-12 col-lg-2 col-xl-2">{side}</div>
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

    return bigContainer;
  }
}

const mapStateToProps = state => ({
  articles: state.articles
});

export default connect(
  mapStateToProps,
  { getInitArticles, getMoreArticles }
)(Home);
