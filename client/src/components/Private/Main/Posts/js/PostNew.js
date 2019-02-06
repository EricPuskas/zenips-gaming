// Dependencies
import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// Actions
import { createPost, clearErrors } from "../../../../../actions/postActions";
// Components
import LoaderSuccess from "../../../../Common/Loader/LoaderSuccess";
import PostForm from "./PostForm";

class PostNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      errors: {}
    };
  }

  componentDidMount() {
    document.title = "Zenips Gaming | New Post";
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.errors) {
      return { errors: nextProps.errors };
    } else return null;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors) {
      this.setState(() => ({ errors: this.props.errors }));
    }
  }

  submitPost = event => {
    event.preventDefault();
    const postData = {
      title: this.state.title,
      content: this.state.content
    };
    this.props.createPost(postData, this.props.history);
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
    const { posts, loading } = this.props.posts;
    const { error } = this.props.errors;
    const { title, content } = this.state;
    let { expandContent } = this.props;
    let mainContainer = classNames({
      "main-container": true,
      minContent: expandContent,
      maxContent: !expandContent
    });

    let post_form;
    posts === null || loading
      ? (post_form = (
          <LoaderSuccess msg={"Data has been saved."} top="25vh" left="-5%" />
        ))
      : (post_form = (
          <PostForm
            error_title={error.title}
            error_content={error.content}
            changeContent={this.changeContent}
            changePostInput={this.changePostInput}
            submitPost={this.submitPost}
            title={title}
            action="create"
            content={content}
            goBack={this.goBack}
          />
        ));
    return <div className={mainContainer}>{post_form}</div>;
  }
}

PostNew.propTypes = {
  posts: PropTypes.object.isRequired,
  errors: PropTypes.object,
  createPost: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  posts: state.posts
});

export default connect(
  mapStateToProps,
  { createPost, clearErrors }
)(withRouter(PostNew));
