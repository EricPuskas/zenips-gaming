// Dependencies
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";

class ArticlesItem extends PureComponent {
  constructor() {
    super();
    this.state = {
      errors: {}
    };
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.errors) {
      return { errors: nextProps.errors };
    } else return null;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors) {
      this.setState(() => ({ errors: this.props.errors }));
    }
  }

  render() {
    let status_icon;
    const { article } = this.props;
    article.status === "Private"
      ? (status_icon = "far fa-eye-slash")
      : (status_icon = "far fa-eye");

    return (
      <div className="col-12 col-lg-12 col-xl-12">
        <div className="row">
          <div className="col-12 col-lg-4 col-xl-4 padding-fix">
            <Link to={`/dashboard/articles/${article._id}`}>
              <img
                src={article.thumbnail}
                alt="Thumbnail"
                className="img-responsive"
              />
            </Link>
          </div>
          <div className="col-12 col-lg-8 col-xl-8 padding-fix search-item-box">
            <div className="row">
              <div className="col-12 search-item-center-mobile">
                <h1 className="search-item-title">{article.title}</h1>
              </div>
              <div className="col-12">
                <div className="row">
                  <div className="search-item-data col-6 col-lg-3 col-xl-3">
                    <img
                      src={article.author.avatar}
                      alt="Author Avatar"
                      className="img-responsive search-item-avatar"
                    />
                    <span>{article.author.name} </span>
                  </div>
                  <div className="search-item-data col-6 col-lg-3 col-xl-3">
                    <i className="far fa-clock" />
                    <span>
                      <Moment fromNow>{article.createdAt}</Moment>
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
            <div className="search-item-content">
              <p>{article.preview}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {}
)(ArticlesItem);
