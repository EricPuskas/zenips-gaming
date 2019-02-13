import React, { Component } from "react";
import PropTypes from "prop-types";
// Utilities
import isEmpty from "../../../../utils/isEmpty";
// Components
import Article from "../Home/js/Article";

class ArticlesFeed extends Component {
  render() {
    const { articles } = this.props;
    const filteredArticles = articles.filter(
      article => article.tag !== "Most Popular"
    );
    const AllArticles = filteredArticles.map(article => (
      <Article key={article._id} article={article} />
    ));
    let content;
    isEmpty(articles)
      ? (content = <h1>No Articles Found</h1>)
      : (content = AllArticles);
    return (
      <div>
        <h1 className="text-center" style={{ margin: "2rem 0" }}>
          Reviews
        </h1>
        <div className="main-holder">
          <div className="row">{content}</div>
        </div>
      </div>
    );
  }
}

ArticlesFeed.propTypes = {
  articles: PropTypes.array.isRequired
};

export default ArticlesFeed;
