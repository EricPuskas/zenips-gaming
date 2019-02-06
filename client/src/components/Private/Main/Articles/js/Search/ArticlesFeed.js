// Dependencies
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// Utilities
import isEmpty from "../../../../../../utils/isEmpty";
// Components
import ArticlesItem from "./ArticlesItem";

class ArticlesFeed extends Component {
  render() {
    const { articles } = this.props.articles;
    const AllArticles = articles.map(article => (
      <ArticlesItem key={article._id} article={article} />
    ));

    let content;
    isEmpty(articles) ? (content = "") : (content = AllArticles);
    return <div className="article-search-box">{content}</div>;
  }
}

ArticlesFeed.propTypes = {
  articles: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  articles: state.articles
});

export default connect(mapStateToProps)(ArticlesFeed);
