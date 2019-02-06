// Dependencies
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";
import Parser from "html-react-parser";
// Actions
import { deletePost } from "../../../../../../../actions/postActions";
import { loadModal } from "../../../../../../../actions/modalActions";
// Utilities
import ytOptimizer from "../../../../../../../utils/ytOptimizer";

class PostItem extends Component {
  componentDidMount() {
    ytOptimizer();
  }

  render() {
    const { post } = this.props;
    const { user } = this.props.auth;
    let content = Parser(post.content);
    let id = post._id;
    let title = post.title;
    let post_user = post.name;

    let MODAL_PROPS = {
      id,
      title,
      user: post_user,
      width: "30%",
      left: "36%",
      top: "10%",
      submitForm: this.props.deletePost,
      header: "Delete Post",
      message: "Are you sure you want to delete this post?",
      success: "Post has been deleted."
    };

    return (
      <li className="timeline-inverted">
        <div className="timeline-badge">
          <span>
            <Moment format="MMM DD, YYYY">{post.createdAt}</Moment>
          </span>
        </div>
        <div className="timeline-panel dark-background">
          <div className="timeline-heading center-on-mobile">
            <small className="user-info-post">
              <img
                src={post.avatar}
                alt="User avatar"
                className="user-post-avatar"
              />
              <span id="user-post-username">{post.name}</span>
              <span id="user-post-time">
                <i className="far fa-clock" />
                <Moment format="MMMM DD, YYYY h:mm A">{post.createdAt}</Moment>
              </span>
            </small>
            {user._id === post.user || user.role.includes("Developer") ? (
              <div className="timeline-buttons text-center">
                <Link
                  className="btn btn-green-d"
                  to={`/dashboard/posts/${post._id}/edit`}
                >
                  <i className="far fa-edit" /> Edit
                </Link>
                <button
                  className="btn btn-red-c"
                  onClick={() =>
                    this.props.loadModal("POST_MODAL", MODAL_PROPS)
                  }
                >
                  <i className="fas fa-trash-alt" /> Delete
                </button>
              </div>
            ) : (
              ""
            )}
            <hr />
            <h3 className="timeline-title text-center">{post.title}</h3>
            <hr />
          </div>
          <div className="timeline-body">{content}</div>
        </div>
      </li>
    );
  }
}

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deletePost, loadModal }
)(PostItem);
