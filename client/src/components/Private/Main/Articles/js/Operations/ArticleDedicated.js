// Dependencies
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// Utils
import ytOptimizer from "../../../../../../utils/ytOptimizer";
//Components
import LoaderLarge from "../../../../../Common/Loader/LoaderLarge";
import ArticlesLatest from "./ArticlesLatest";
import Article from "./Article";
import ScrollToTop from "../../../../../Common/ScrollToTop/ScrollToTop";
import SearchEngine from "../../../../../Common/SearchEngine/SearchEngine";
// Actions
import {
  getArticle,
  getInitArticles,
  getMoreArticles,
  deleteArticle
} from "../../../../../../actions/articleActions";
import { loadModal } from "../../../../../../actions/modalActions";

class ArticleDedicated extends PureComponent {
  constructor() {
    super();
    this.state = {
      hideScrollTopButton: true,
      mobile: false,
      search: ""
    };
  }

  componentDidMount() {
    document.title = "Zenips Gaming";
    this.props.getArticle(this.props.match.params.id);
    const { per, page } = this.props.articles;
    this.props.getInitArticles(per, page, this.state.search);
    setTimeout(() => ytOptimizer(), 3000);
  }

  componentDidUpdate(prevProps) {
    const article_id = this.props.match.params.id;
    prevProps.match.params.id !== article_id &&
      this.props.getArticle(article_id);
    ytOptimizer();
  }

  // shouldComponentUpdate(nextProps) {
  //   const article_id = this.props.match.params.id;
  //   if (nextProps.match.params.id === article_id) {
  //     return true;
  //   } else {
  //     console.log("NO MATCH");
  //     return false;
  //   }
  // }

  escapeRegex = text => {
    return text.replace(/[\s]/g, "+");
  };

  onSearchChange = event => {
    let search = event.target.value;
    this.setState({ search });
  };

  onSearchSubmit = () => {
    if (this.state.search !== "") {
      let search_query = this.escapeRegex(this.state.search);
      this.props.history.push(
        `/dashboard/articles/results?search_query=${search_query}`
      );
    }
  };

  handleScroll = (scrolling, totalPages, page, per) => {
    const container = document.getElementById("container");
    const offset = document.getElementById("offset");
    const target = document.getElementById("target");
    if (container && offset && target) {
      container.scrollTop <= 1100 &&
        container.scrollTop > 400 &&
        this.setState({ hideScrollTopButton: false });

      container.scrollTop <= 400 &&
        container.scrollTop >= 100 &&
        this.setState({ hideScrollTopButton: true });

      if (scrolling) return;
      if (totalPages <= page) return;
    }
  };

  goBack = () => {
    this.props.history.goBack();
  };

  deleteArticle = (id, history) => {
    this.props.deleteArticle(id, history);
  };

  render() {
    const container = document.getElementById("container");
    const {
      init_loading,
      article,
      articles,
      scrolling,
      totalPages,
      page,
      per
    } = this.props.articles;
    let article_id = article._id;
    let MODAL_PROPS = {
      id: article_id,
      width: "30%",
      left: "36%",
      top: "10%",
      submitForm: this.deleteArticle,
      header: "Delete Article",
      message: "Are you sure you want to delete this article?",
      success: "Article has been deleted."
    };
    let main, status_icon;
    let { expandContent } = this.props;

    article.status === "Private"
      ? (status_icon = "far fa-eye-slash")
      : (status_icon = "far fa-eye");

    const AllArticles = articles.map(article => (
      <ArticlesLatest
        key={article._id}
        article={article}
        status_icon={status_icon}
      />
    ));

    let mainContainer = classNames({
      "main-container": true,
      minContent: expandContent,
      maxContent: !expandContent
    });

    article === null || init_loading || Object.keys(article).length === 0
      ? (main = <LoaderLarge msg={"Loading Content. Please wait."} />)
      : (main = (
          <Article
            goBack={this.goBack}
            article={article}
            status_icon={status_icon}
            loadModal={this.props.loadModal}
            MODAL_PROPS={MODAL_PROPS}
          />
        ));

    return (
      <div
        id="container"
        onScroll={() => this.handleScroll(scrolling, totalPages, page, per)}
        className={mainContainer}
      >
        <div id="offset">
          <div className="row">
            <div className="col-12 col-lg-9 col-xl-9">
              <SearchEngine
                onSearchSubmit={this.onSearchSubmit}
                onSearchChange={this.onSearchChange}
              />
              {main}
            </div>
            <div className="col-12 col-lg-3 col-xl-3">
              <div className="scrollable-div">
                <h1 className="text-center">Latest Articles</h1>
                {AllArticles}
              </div>
            </div>
          </div>
          <div id="target">
            <ScrollToTop
              hideScrollTopButton={this.state.hideScrollTopButton}
              container={container}
              scrollStepInPx="50"
              delayInMs="5"
            />
          </div>
        </div>
      </div>
    );
  }
}

ArticleDedicated.propTypes = {
  articles: PropTypes.object.isRequired,
  getArticle: PropTypes.func.isRequired,
  getMoreArticles: PropTypes.func.isRequired,
  getInitArticles: PropTypes.func.isRequired,
  deleteArticle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  articles: state.articles
});

export default connect(
  mapStateToProps,
  { loadModal, getInitArticles, getArticle, getMoreArticles, deleteArticle }
)(withRouter(ArticleDedicated));
