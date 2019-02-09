import React from "react";
import Moment from "react-moment";
import Parser from "html-react-parser";

const ArticleDedicated = ({ goBack, article, status_icon }) => {
  let content;
  if (typeof article.content === "string") content = Parser(article.content);
  return (
    <div className="row">
      <div className="article-container row">
        <div className="col-12 reset-padding article-thumbnail-main">
          <h1 className="text-center">{article.title}</h1>
          <div className="article-info-div text-center">
            <div className="article-info-itm">
              <img
                src={article.author.avatar}
                alt="Author Avatar"
                className="img-responsive author-avatar-small"
              />
              <span>{article.author.name} </span>
            </div>
            <div className="article-info-itm text-center">
              <i className="far fa-clock" />
              <span>
                <Moment format="MMM DD - h:mm A">{article.createdAt}</Moment>
              </span>
            </div>
            <div className="article-info-itm text-center">
              <i className="fas fa-tag" />
              <span>{article.tag}</span>
            </div>
          </div>
          <img
            src={article.thumbnail}
            alt="Thumbnail"
            className="img-responsive article-thumbnail"
          />
        </div>
        <div className="col-12 reset-padding">
          <div className="article-info-main">
            <div className="article-content-div">{content}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDedicated;