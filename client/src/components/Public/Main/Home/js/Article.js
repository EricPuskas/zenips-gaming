// Dependencies
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import lozad from "lozad";

class Article extends PureComponent {
  componentDidMount() {
    const observer = lozad(); // lazy loads elements with default selector as '.lozad'
    observer.observe();
  }
  render() {
    const { article } = this.props;
    let preview = article.preview.substring(0, 200);
    if (article.preview.length > 200) preview += "...";
    return (
      <div className="article-box-item row">
        <div className="col-12 col-xl-5 reset-padding article-thumbnail-main">
          <Link to={`/articles/${article._id}`}>
            <img
              src="http://res.cloudinary.com/zenipsstudio/image/upload/fl_lossy,q_auto:low/v1550092423/mobius-placeholder-4.jpg"
              data-src={article.thumbnail}
              alt="Thumbnail"
              className="lozad img-responsive article-thumbnail"
            />
          </Link>
        </div>
        <div className="col-12 col-xl-7 reset-padding">
          <div className="article-info-main">
            <Link to={`/articles/${article._id}`}>
              <h1 className="latest-post-title text-center">{article.title}</h1>
            </Link>
            <div className="article-info-div text-center">
              <div className="article-info-itm">
                <img
                  data-src={article.author.avatar}
                  alt="Author Avatar"
                  className="lozad img-responsive author-avatar-small"
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
              <Link to={`/articles/${article._id}`}>
                <p>{preview}</p>
              </Link>
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
