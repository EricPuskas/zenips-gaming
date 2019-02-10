// Dependencies
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import DisqusThread from "../../../Common/DisqusThread";
import { Helmet } from "react-helmet";
// Utils
import ytOptimizer from "../../../../utils/ytOptimizer";
//Components
import LoaderRolling from "../../../Common/Loader/LoaderRolling";
import ArticleDedicated from "./js/ArticleDedicated";
import ArticleShare from "./js/ArticleShare";
import ScrollToTop from "../../../Common/ScrollToTop/ScrollToTop";
import Navigation from "../../../Layout/Public/Navigation/Navigation";
import Footer from "../../../Layout/Public/Footer/Footer";
// Actions
import { getArticle, getTopArticle } from "../../../../actions/articleActions";
import isEmpty from "../../../../utils/isEmpty";
import "./css/Article.css";
let lastScrollTop = 0;

class Article extends PureComponent {
  constructor() {
    super();
    this.state = {
      hideScrollTopButton: true,
      expandContent: false,
      mobile: false,
      disqus: false,
      hideFooter: false,
      hideTopNav: false
    };
  }

  componentDidMount() {
    document.title = "Zenips Gaming";
    if (window.innerWidth <= 768) {
      this.setState(prevState => {
        return { mobile: !prevState.mobile };
      });
    }
    this.props.getArticle(this.props.match.params.id);
    if (isEmpty(this.props.articles.topArticle)) {
      this.props.getTopArticle(1, 1);
    }
    setTimeout(() => ytOptimizer(), 3000);
  }

  componentDidUpdate(prevProps) {
    const article_id = this.props.match.params.id;
    prevProps.match.params.id !== article_id &&
      this.props.getArticle(article_id);
    ytOptimizer();
  }

  handleScroll = e => {
    e.stopPropagation();
    const container = document.getElementById("container");
    const offset = document.getElementById("offset");
    const target = document.getElementById("target");
    const targetOffset = target.offsetTop;
    const containerOffset = container.offsetTop + container.clientHeight;
    const pageOffset = container.scrollTop + offset.offsetTop;

    let result = pageOffset + containerOffset;
    if (result > targetOffset + (container.offsetTop - container.scrollTop)) {
      this.setState({ disqus: true });
    }
    let st = window.pageYOffset || container.scrollTop;

    if (st > lastScrollTop) {
      // downscroll code
      if (this.state.hideFooter === false) {
        this.setState({
          expandContent: true,
          hideFooter: true,
          hideTopNav: true
        });
      }
    } else {
      // upscroll code
      if (this.state.hideFooter === true) {
        this.setState({
          expandContent: false,
          hideFooter: false,
          hideTopNav: false
        });
      }
    }
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    if (container) {
      container.scrollTop <= 1100 &&
        container.scrollTop > 400 &&
        this.setState({ hideScrollTopButton: false });

      container.scrollTop <= 400 &&
        container.scrollTop >= 100 &&
        this.setState({ hideScrollTopButton: true });
    }
  };

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    const container = document.getElementById("container");
    const { init_loading, article } = this.props.articles;
    let main, status_icon, disqus_thread;

    article.status === "Private"
      ? (status_icon = "far fa-eye-slash")
      : (status_icon = "far fa-eye");

    let contentClass = classNames({
      "content-container": true,
      expand: this.state.expandContent
    });

    article === null || init_loading || Object.keys(article).length === 0
      ? (main = (
          <LoaderRolling msg={"Loading... Please wait."} margin="50px auto" />
        ))
      : (main = (
          <ArticleDedicated
            goBack={this.goBack}
            article={article}
            status_icon={status_icon}
          />
        ));
    if (article._id !== undefined && this.state.disqus) {
      disqus_thread = (
        <DisqusThread
          id={article._id}
          title={article.title}
          path={this.props.history.location.pathname}
        />
      );
    }
    console.log(document.URL);
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{article.title}</title>
          <meta property="og:image" content={article.thumbnail} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={document.URL} />
          <meta property="og:title" content={article.title} />
          <meta property="og:description" content={article.preview} />
        </Helmet>
        <Navigation hideTopNav={this.state.hideTopNav} />

        <div className="wrapper_main">
          <div
            id="container"
            onScroll={e => this.handleScroll(e)}
            className={contentClass}
          >
            <div id="offset">
              <div className="row article-m-container">
                <div className="col-12 col-lg-2 col-xl-2">
                  <ArticleShare
                    mobile={this.state.mobile}
                    id={article._id}
                    thumbnail={article.thumbnail}
                  />
                </div>

                <div className="col-12 col-lg-8 col-xl-8">
                  {main}
                  {disqus_thread}
                </div>
                <div className="col-12 col-lg-2 col-xl-2" />
              </div>
              <div id="target">
                <ScrollToTop
                  customScroll={true}
                  hideScrollTopButton={this.state.hideScrollTopButton}
                  container={container}
                  scrollStepInPx="50"
                  delayInMs="5"
                />
              </div>
            </div>
          </div>
        </div>
        <Footer hideFooter={this.state.hideFooter} />
      </div>
    );
  }
}

Article.propTypes = {
  articles: PropTypes.object.isRequired,
  getArticle: PropTypes.func.isRequired,
  getTopArticle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  articles: state.articles
});

export default connect(
  mapStateToProps,
  { getArticle, getTopArticle }
)(withRouter(Article));
