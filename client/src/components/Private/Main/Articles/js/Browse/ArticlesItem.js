// Dependencies
import React, { Component } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import classNames from "classnames";

class ArticlesItem extends Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    let status_icon;
    const { article } = this.props;

    article.status === "Private"
      ? (status_icon = "far fa-eye-slash")
      : (status_icon = "far fa-eye");

    let statusClass = classNames({
      "article-status text-center": true,
      "as-private": article.status === "Private",
      "as-public": article.status === "Public"
    });

    return (
      <div className="col-12 col-lg-3 col-xl-3">
        <div className="article-box">
          <div className="article-meta">
            <div className={statusClass}>
              <i className={status_icon} /> {article.status}
            </div>
          </div>
          <Link to={`/dashboard/articles/${article._id}`}>
            <img
              src={article.thumbnail}
              alt="Thumbnail"
              className="img-responsive"
            />
          </Link>
          <h1 className="article-title">{article.title}</h1>
          <div className="col-12">
            <div className="row">
              <div className="col-12 text-center article-tag">
                <i className="fas fa-tag" />
                <span>{article.tag}</span>
              </div>
              <div className="search-item-data col-6 col-lg-6 col-xl-6">
                <img
                  src={article.author.avatar}
                  alt="Author Avatar"
                  className="img-responsive search-item-avatar"
                />
                <span>{article.author.name} </span>
              </div>
              <div className="search-item-data col-6 col-lg-6 col-xl-6">
                <i className="far fa-clock" />
                <span>
                  <Moment fromNow>{article.createdAt}</Moment>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ArticlesItem;
