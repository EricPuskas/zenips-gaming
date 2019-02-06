// Dependencies
import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// Actions
import {
  updatePost,
  getPost,
  clearErrors
} from "../../../../../actions/postActions";
// Utilities
import isEmpty from "../../../../../utils/isEmpty";
// Components
import LoaderSuccess from "../../../../Common/Loader/LoaderSuccess";
import LoaderLarge from "../../../../Common/Loader/LoaderLarge";
import PostForm from "./PostForm";

class PostEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      errors: {}
    };
  }

  componentDidMount() {
    document.title = "Zenips Gaming | Update Post";
    this.props.getPost(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors) {
      this.setState(() => ({ errors: this.props.errors }));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.posts.post) {
      const post = nextProps.posts.post;
      post.title = !isEmpty(post.title) ? post.title : "";
      post.content = !isEmpty(post.content) ? post.content : "";
      this.setState({
        title: post.title,
        content: post.content
      });
    }
  }

  submitPost = event => {
    event.preventDefault();
    const postData = {
      title: this.state.title,
      content: this.state.content
    };
    this.props.updatePost(
      this.props.match.params.id,
      postData,
      this.props.history
    );
  };

  changePostInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  changeContent = content => {
    this.setState({ content });
  };

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { update_loading, loading, post } = this.props.posts;
    const { error } = this.state.errors;
    const { title, content } = this.state;
    let { expandContent } = this.props;
    let mainContainer = classNames({
      "main-container": true,
      minContent: expandContent,
      maxContent: !expandContent
    });
    let post_form;
    if (post === null || loading || Object.keys(post).length === 0) {
      post_form = <LoaderLarge msg={"Loading Content. Please wait."} />;
    } else {
      post_form = (
        <PostForm
          error={error}
          changeContent={this.changeContent}
          changePostInput={this.changePostInput}
          submitPost={this.submitPost}
          title={title}
          action="update"
          content={content}
          goBack={this.goBack}
        />
      );
    }

    if (update_loading === true) {
      post_form = (
        <LoaderSuccess
          msg={"The post has been updated."}
          top="25vh"
          left="-5%"
        />
      );
    }

    return <div className={mainContainer}>{post_form}</div>;
  }
}

PostEdit.propTypes = {
  posts: PropTypes.object.isRequired,
  errors: PropTypes.object,
  updatePost: PropTypes.func.isRequired,
  getPost: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  posts: state.posts
});

export default connect(
  mapStateToProps,
  { updatePost, getPost, clearErrors }
)(withRouter(PostEdit));
