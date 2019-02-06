import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const ArticlesLatest = ({ status_icon, article }) => {
  return (
    <div className="article-box">
      <div className="article-meta">
        {article.status === "Private" ? (
          <div className="article-status text-center as-private">
            <i className={status_icon} /> {article.status}
          </div>
        ) : (
          <div className="article-status text-center as-public">
            <i className={status_icon} /> {article.status}
          </div>
        )}
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
  );
};

export default ArticlesLatest;
