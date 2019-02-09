import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// Components
import ArticlesForm from "./ArticlesForm";
// Actions
import { loadModal } from "../../../../../../actions/modalActions";
import {
  createArticle,
  clearErrors,
  getTags
} from "../../../../../../actions/articleActions";
// CSS
import "../../css/Articles.css";

class ArticlesNew extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      content: "",
      preview: "",
      tag: "Choose a tag",
      status: "Private",
      thumbnail: "",
      thumbnail_file: false,
      thumbnail_source: "",
      thumbnail_author: "",
      errors: {}
    };
  }
  componentDidMount() {
    document.title = "Zenips Gaming | New Article";
    this.props.clearErrors();
    this.props.getTags();
    this.setState({
      thumbnail: "https://dummyimage.com/hd720",
      thumbnail_author: "zenipsgaming",
      thumbnail_source: "zenipsgaming"
    });
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

  submitForm = event => {
    event.preventDefault();
    const data = {
      title: this.state.title,
      content: this.state.content,
      preview: this.state.preview,
      tag: this.state.tag,
      status: this.state.status,
      thumbnail: this.state.thumbnail,
      thumbnail_file: this.state.thumbnail_file,
      thumbnail_author: this.state.thumbnail_author,
      thumbnail_source: this.state.thumbnail_source
    };
    this.props.createArticle(data, this.props.history);
  };

  changeInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  changeContent = content => {
    this.setState({ content });
  };

  updateThumbnailCredits = (author, source) => {
    this.setState({
      thumbnail_author: author,
      thumbnail_source: source
    });
  };

  updateThumbnail = thumbnail => {
    this.setState({ thumbnail });
  };

  updateThumbnailFile = thumbnail_file => {
    this.setState({ thumbnail_file });
  };

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { expandContent } = this.props;
    const { tags, loading } = this.props.articles;
    const { error } = this.props.errors;
    const {
      title,
      tag,
      content,
      preview,
      thumbnail,
      thumbnail_author,
      thumbnail_source,
      status
    } = this.state;

    const tagsOptions = tags.map(tag => (
      <option key={tag._id} value={tag.name}>
        {tag.name}
      </option>
    ));

    let mainContainer = classNames({
      "main-container": true,
      minContent: expandContent,
      maxContent: !expandContent
    });

    let form = (
      <ArticlesForm
        loading={loading}
        error={error}
        changeContent={this.changeContent}
        changeInput={this.changeInput}
        submitForm={this.submitForm}
        title={title}
        action="create"
        content={content}
        preview={preview}
        thumbnail={thumbnail}
        defaultTag={tag}
        tags={tagsOptions}
        defaultStatus={status}
        thumbnail_author={thumbnail_author}
        thumbnail_source={thumbnail_source}
        updateThumbnail={this.updateThumbnail}
        updateThumbnailFile={this.updateThumbnailFile}
        updateThumbnailCredits={this.updateThumbnailCredits}
        loadModal={this.props.loadModal}
        goBack={this.goBack}
      />
    );
    return <div className={mainContainer}>{form}</div>;
  }
}

ArticlesNew.propTypes = {
  errors: PropTypes.object,
  articles: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  articles: state.articles
});

export default connect(
  mapStateToProps,
  { loadModal, createArticle, clearErrors, getTags }
)(withRouter(ArticlesNew));
