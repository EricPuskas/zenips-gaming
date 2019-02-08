// Dependencies
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

class Article extends PureComponent {
  render() {
    const { article } = this.props;
    let preview = article.preview.substring(0, 200);
    if (article.preview.length > 200) preview += "...";
    return (
      <div className="article-box-item row">
        <div className="col-12 col-xl-5 reset-padding article-thumbnail-main">
          <img
            src={article.thumbnail}
            alt="Thumbnail"
            className="img-responsive article-thumbnail"
          />
        </div>
        <div className="col-12 col-xl-7 reset-padding">
          <div className="article-info-main">
            <h1 className="latest-post-title text-center">{article.title}</h1>
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
            <div className="article-info-preview">
              <p>{preview}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Article.propTypes = {
  article: PropTypes.object.isRequired
};

export default Article;
