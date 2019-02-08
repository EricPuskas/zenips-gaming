import React from "react";
import Moment from "react-moment";

const TopArticle = ({ topArticle, large_screen }) => {
  let article = null;
  let preview = null;
  let content;

  if (topArticle.length > 0) {
    article = topArticle[0];
    if (!large_screen) {
      preview = article.preview.substring(0, 200);
      if (article.preview.length > 200) preview += "...";
    } else {
      preview = article.preview.substring(0, 125);
      if (article.preview.length > 125) preview += "...";
    }
  }

  topArticle.length > 0
    ? (content = (
        <div className="top-article-container text-center">
          <h1>Article of the week!</h1>
          <h1 className="latest-post-title text-center">{article.title}</h1>
          <div className="article-info-div text-center">
            <div className="article-info-itm">
              <img
                src={article.author.avatar}
                alt="Author Avatar"
                className="img-responsive author-avatar-small"
              />
              <span> {article.author.name}</span>
            </div>
            <div className="article-info-itm text-center">
              <i className="far fa-clock" />
              <span>
                {" "}
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
          <p>{preview}</p>
        </div>
      ))
    : (content = null);
  return content;
};

export default TopArticle;
