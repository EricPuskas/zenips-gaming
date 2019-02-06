// Dependencies
import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// Actions
import {
  updateArticle,
  getArticle,
  getTags
} from "../../../../../../actions/articleActions";
import { loadModal } from "../../../../../../actions/modalActions";
// Utilities
import isEmpty from "../../../../../../utils/isEmpty";

// Components
import LoaderSuccess from "../../../../../Common/Loader/LoaderSuccess";
import LoaderLarge from "../../../../../Common/Loader/LoaderLarge";
import ArticlesForm from "./ArticlesForm";
// CSS
import "../../css/Articles.css";

class ArticlesEdit extends Component {
  constructor(props) {
    super(props);
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
    document.title = "Zenips Gaming | Update Article";
    this.props.getTags();
    this.props.getArticle(this.props.match.params.id);
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

    if (nextProps.articles.article) {
      const article = nextProps.articles.article;

      article.title = !isEmpty(article.title) ? article.title : "";
      article.content = !isEmpty(article.content) ? article.content : "";
      article.preview = !isEmpty(article.preview) ? article.preview : "";
      article.tag = !isEmpty(article.tag) ? article.tag : "";
      article.status = !isEmpty(article.status) ? article.status : "";
      article.thumbnail = !isEmpty(article.thumbnail) ? article.thumbnail : "";
      article.thumbnail_source = !isEmpty(article.thumbnail_source)
        ? article.thumbnail_source
        : "";
      article.thumbnail_author = !isEmpty(article.thumbnail_author)
        ? article.thumbnail_author
        : "";

      this.setState({
        title: article.title,
        content: article.content,
        preview: article.preview,
        tag: article.tag,
        status: article.status,
        thumbnail: article.thumbnail,
        thumbnail_source: article.thumbnailSource,
        thumbnail_author: article.thumbnailAuthor
      });
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
    this.props.updateArticle(
      this.props.match.params.id,
      data,
      this.props.history
    );
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
    const { update_loading, loading, article, tags } = this.props.articles;
    const { error } = this.state.errors;
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

    let { expandContent } = this.props;
    const filteredTags = tags.filter(tag => tag.name !== this.state.tag);
    const tagsOptions = filteredTags.map(tag => (
      <option key={tag._id} value={tag.name}>
        {tag.name}
      </option>
    ));

    let mainContainer = classNames({
      "main-container": true,
      minContent: expandContent,
      maxContent: !expandContent
    });

    let article_form;
    article === null || loading || Object.keys(article).length === 0
      ? (article_form = <LoaderLarge msg={"Loading Content. Please wait."} />)
      : (article_form = (
          <ArticlesForm
            error={error}
            changeContent={this.changeContent}
            changeInput={this.changeInput}
            submitForm={this.submitForm}
            title={title}
            action="update"
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
        ));

    if (update_loading === true) {
      article_form = (
        <LoaderSuccess
          msg={"The article has been updated."}
          top="25vh"
          left="-5%"
        />
      );
    }

    return <div className={mainContainer}>{article_form}</div>;
  }
}

ArticlesEdit.propTypes = {
  articles: PropTypes.object.isRequired,
  updateArticle: PropTypes.func.isRequired,
  getArticle: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  articles: state.articles
});

export default connect(
  mapStateToProps,
  { loadModal, updateArticle, getArticle, getTags }
)(withRouter(ArticlesEdit));
