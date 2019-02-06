// Dependencies
import React, { Component } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
// Utilities
import ytOptimizer from "../../../../../../../utils/ytOptimizer";

class ArticlesItem extends Component {
  componentDidMount() {
    ytOptimizer();
  }

  render() {
    const { article } = this.props;
    let status_icon;
    article.status === "Private"
      ? (status_icon = "far fa-eye-slash")
      : (status_icon = "far fa-eye");
    return (
      <div className="row">
        <div className="col-12 dedicated-article-box">
          <div className="row">
            <div className="col-12 text-center">
              <h1 className="search-item-title">{article.title}</h1>
            </div>
            <div className="col-12" style={{ paddingBottom: "1rem" }}>
              <div className="row center-on-mobile">
                <div className="sid-sm search-item-data col-12 col-lg-4 col-xl-4">
                  <i className="far fa-clock" />
                  <span>
                    <Moment format="MMMM DD, YYYY">{article.createdAt}</Moment>
                  </span>
                </div>
                <div className="sid-sm search-item-data col-6 col-lg-4 col-xl-4">
                  <i className="fas fa-tag" />
                  <span>{article.tag}</span>
                </div>
                <div className="sid-sm search-item-data col-6 col-lg-4 col-xl-4">
                  <i className={status_icon} />
                  <span>{article.status}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <Link to={`/dashboard/articles/${article._id}`}>
              <img
                src={article.thumbnail}
                alt="Thumbnail"
                className="img-responsive article-thumbnail-private"
              />
            </Link>
          </div>
          <div className="dedicated-article-content">
            <p> {article.preview}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ArticlesItem;
