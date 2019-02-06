import React, { Component } from "react";
import PropTypes from "prop-types";
// Utilities
import isEmpty from "../../../../../../utils/isEmpty";
// Components
import ArticleItems from "./ArticleItem";

class ArticlesFeed extends Component {
  render() {
    const { articles } = this.props;
    const AllArticles = articles.map(article => (
      <ArticleItems key={article._id} article={article} />
    ));

    let content;
    isEmpty(articles) ? (content = "") : (content = AllArticles);
    return <div className="row">{content}</div>;
  }
}

ArticlesFeed.propTypes = {
  articles: PropTypes.array.isRequired
};

export default ArticlesFeed;
