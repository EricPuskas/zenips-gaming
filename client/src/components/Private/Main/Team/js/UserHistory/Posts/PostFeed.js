// Dependencies
import React, { Component } from "react";
import PropTypes from "prop-types";
// Utilities
import isEmpty from "../../../../../../../utils/isEmpty";
// Components
import PostItem from "./PostItem";

class PostFeed extends Component {
  render() {
    const { posts } = this.props;
    const AllPosts = posts.map(post => <PostItem key={post._id} post={post} />);

    let content;
    isEmpty(posts)
      ? (content = "")
      : (content = <ul className="timeline">{AllPosts}</ul>);
    return content;
  }
}

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostFeed;
