// Dependencies
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames";
// Actions
import { getInitPosts, getMorePosts } from "../../../../actions/postActions";
// Utilities
import isEmpty from "../../../../utils/isEmpty";
// Components
import PostFeed from "./js/PostFeed";
import LoaderLarge from "../../../Common/Loader/LoaderLarge";
import LoaderSmall from "../../../Common/Loader/LoaderSmall";
import ScrollToTop from "../../../Common/ScrollToTop/ScrollToTop";
import Note from "../../Side/Note/Note";
// CSS
import "./css/Posts.css";

class Posts extends PureComponent {
  constructor() {
    super();
    this.state = {
      hideScrollTopButton: true,
      mobile: false
    };
  }

  componentDidMount() {
    document.title = "Zenips Gaming | Dashboard";
    if (window.innerWidth <= 414) {
      this.setState(prevState => {
        return { mobile: !prevState.mobile };
      });
    }
    const { per, page, posts } = this.props.posts;
    if (isEmpty(posts)) {
      this.props.getInitPosts(per, page);
    }
  }

  handleScroll = (scrolling, totalPages, page, per) => {
    const container = document.getElementById("container");
    const offset = document.getElementById("offset");
    const target = document.getElementById("target");
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
      if (result > targetOffset + (container.offsetTop - container.scrollTop)) {
        this.props.getMorePosts(per, page + 1);
      }
    }
  };

  render() {
    const container = document.getElementById("container");
    const { expandContent } = this.props;
    const {
      scrolling,
      totalPages,
      page,
      per,
      posts,
      loading,
      init_loading
    } = this.props.posts;
    let main,
      side,
      endLoad,
      loader_icon = "";
    this.state.mobile ? (side = "") : (side = <Note />);
    let mainContainer = classNames({
      "main-container": true,
      minContent: expandContent,
      maxContent: !expandContent
    });

    let topControls = classNames({
      "btn btn-blue-l top-control-item": true,
      minContent: expandContent,
      maxContent: !expandContent
    });

    if (totalPages === page && page > 1 && !loading) {
      side = <Note />;
      endLoad = <div className="fadeInEnd">You've reached the end.</div>;
    }

    loading ? (loader_icon = <LoaderSmall />) : (loader_icon = "");

    posts === null || init_loading
      ? (main = <LoaderLarge msg={"Loading Content. Please wait."} />)
      : (main = <PostFeed posts={posts} />);

    return (
      <div
        id="container"
        className={mainContainer}
        onScroll={() => this.handleScroll(scrolling, totalPages, page, per)}
      >
        <div id="offset">
          <div className="top-controls-fixed">
            <Link to="/dashboard/posts/new">
              <button className={topControls}>
                <i className="fas fa-plus" /> New
              </button>
            </Link>
          </div>
          <div className="row">
            <div className="col-12 col-lg-8 col-xl-8">
              {main}
              {loader_icon}
            </div>
            <div className="col-12 col-lg-4 col-xl-4">{side}</div>
          </div>
          {endLoad}
          <div id="target">
            <ScrollToTop
              hideScrollTopButton={this.state.hideScrollTopButton}
              container={container}
              scrollStepInPx="50"
              delayInMs="5"
            />
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  posts: PropTypes.object.isRequired,
  getInitPosts: PropTypes.func.isRequired,
  getMorePosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts
});

export default connect(
  mapStateToProps,
  { getInitPosts, getMorePosts }
)(Posts);
