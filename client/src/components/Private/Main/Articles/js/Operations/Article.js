import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import Parser from "html-react-parser";

const Article = ({ MODAL_PROPS, loadModal, goBack, article, status_icon }) => {
  let content;
  if (typeof article.content === "string") content = Parser(article.content);
  return (
    <div className="row">
      <div className="col-12 dedicated-article-box">
        <div className="dedicated-article-back-btn">
          <button type="button" onClick={() => goBack()}>
            <i className="fas fa-arrow-circle-left" />
          </button>
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <h1 className="search-item-title">{article.title}</h1>
            <div className="text-center">
              <Link
                className="btn btn-green-d"
                to={`/dashboard/articles/${article._id}/edit`}
              >
                <i className="far fa-edit" /> Edit
              </Link>
              <button
                className="btn btn-red-c"
                type="button"
                onClick={() => loadModal("ARTICLE_DEL_MODAL", MODAL_PROPS)}
              >
                <i className="fas fa-trash-alt" /> Delete
              </button>
            </div>
          </div>
          <div
            className="col-12 col-lg-10 col-xl-10 center-div"
            style={{ padding: "1rem 0" }}
          >
            <div className="row">
              <div className="search-item-data col-5 col-lg-3 col-xl-3">
                <img
                  src={article.author.avatar}
                  alt="Author Avatar"
                  className="img-responsive search-item-avatar"
                />
                <span>{article.author.name} </span>
              </div>
              <div className="search-item-data col-7 col-lg-3 col-xl-3">
                <i className="far fa-clock" />
                <span>
                  <Moment format="MMMM DD, YYYY">{article.createdAt}</Moment>
                </span>
              </div>
              <div className="search-item-data col-6 col-lg-3 col-xl-3">
                <i className="fas fa-tag" />
                <span>{article.tag}</span>
              </div>
              <div className="search-item-data col-6 col-lg-3 col-xl-3">
                <i className={status_icon} />
                <span>{article.status}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <img
            src={article.thumbnail}
            alt="Thumbnail"
            className="img-responsive article-thumbnail-private"
          />
        </div>
        <div className="dedicated-article-content">{content}</div>
      </div>
    </div>
  );
};

export default Article;
