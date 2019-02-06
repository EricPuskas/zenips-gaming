// Dependencies
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";

class ArticleItem extends PureComponent {
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
    const { article } = this.props;
    let preview = article.preview.substring(0, 225);
    if (article.preview.length > 225) preview += "...";
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
                  className="img-responsive search-item-avatar"
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

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {}
)(ArticleItem);
