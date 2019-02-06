// Dependencies
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// Utils
import isEmpty from "../../../../../../../utils/isEmpty";
// Actions
import {
  getUserInitPosts,
  getMoreUserPosts,
  pageUpdateUPosts
} from "../../../../../../../actions/memberActions";
// Components
import PostFeed from "./PostFeed";
import LoaderLarge from "../../../../../../Common/Loader/LoaderLarge";
import LoaderSmall from "../../../../../../Common/Loader/LoaderSmall";
import ScrollToTop from "../../../../../../Common/ScrollToTop/ScrollToTop";

class Posts extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hideScrollTopButton: true
    };
  }

  componentDidUpdate(prevProps) {
    const username = this.props.member.member.username;
    const { per, page } = this.props.member.posts;
    prevProps.member.member.username !== username &&
      this.props.getUserInitPosts(username, per, page);
  }

  handleScroll = (scrolling, totalPages, page, per) => {
    const container = document.getElementById("container");
    const offset = document.getElementById("offset");
    const target = document.getElementById("target");
    const username = this.props.member.member.username;
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
      result > targetOffset + (container.offsetTop - container.scrollTop) &&
        this.props.getMoreUserPosts(username, per, page + 1);
    }
  };
  render() {
    const container = document.getElementById("container");
    const {
      totalPages,
      page,
      per,
      posts,
      scrolling,
      loading,
      init_loading
    } = this.props.member.posts;
    let main, endLoad, loader_icon;

    if (totalPages === page && page > 1 && !loading) {
      endLoad = <div className="fadeInEnd">You've reached the end.</div>;
    }

    loading ? (loader_icon = <LoaderSmall />) : (loader_icon = "");

    if (posts === null || init_loading) {
      main = <LoaderLarge msg={"Loading Content. Please wait."} />;
    } else if (!init_loading && isEmpty(posts)) {
      main = (
        <div className="text-center">
          <h2 style={{ paddingTop: "10rem" }}>No posts found.</h2>
        </div>
      );
    } else {
      main = <PostFeed posts={posts} />;
    }

    return (
      <div
        id="container"
        onScroll={() => this.handleScroll(scrolling, totalPages, page, per)}
        className="posts-container"
      >
        <div id="offset">
          <div className="row">
            <div className="col-12">
              {main}
              {loader_icon}
            </div>
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
  member: PropTypes.object.isRequired,
  getMoreUserPosts: PropTypes.func.isRequired,
  pageUpdateUPosts: PropTypes.func.isRequired,
  getUserInitPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  member: state.member
});

export default connect(
  mapStateToProps,
  { getUserInitPosts, getMoreUserPosts, pageUpdateUPosts }
)(Posts);
