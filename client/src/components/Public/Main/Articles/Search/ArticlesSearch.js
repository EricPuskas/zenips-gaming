import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  getSearchArticles,
  getMoreArticles
} from "../../../../../actions/articleActions";
// Components
import Navigation from "../../../../Layout/Public/Navigation/Navigation";
import Footer from "../../../../Layout/Public/Footer/Footer";
import ArticlesFeed from "./ArticlesFeed";
import LoaderRolling from "../../../../Common/Loader/LoaderRolling";
import LoaderSmall from "../../../../Common/Loader/LoaderSmall";
import ScrollToTop from "../../../../Common/ScrollToTop/ScrollToTop";
import queryString from "query-string";
let lastScrollTop = 0;
class ArticlesSearch extends Component {
  constructor() {
    super();
    this.state = {
      mobile: false,
      large_screen: false,
      hideScrollTopButton: true,
      expandContent: false,
      hideFooter: false,
      hideTopNav: false,
      search: "",
      display_update: false
    };
  }
  componentDidMount() {
    document.title = "Zenips Gaming | Articles";
    window.addEventListener("newContentAvailable", () => {
      this.setState({
        display_update: true
      });
    });
    window.innerWidth <= 813 &&
      this.setState(prevState => {
        return { mobile: !prevState.mobile };
      });

    window.innerWidth >= 1024 &&
      window.innerWidth < 1537 &&
      this.setState(prevState => {
        return { large_screen: !prevState.large_screen };
      });

    let search_value = queryString.parse(this.props.location.search);
    if (search_value.search_query !== "") {
      this.props.getSearchArticles(3, 1, search_value.search_query);
    } else {
      this.props.history.push(`/articles`);
    }
  }

  componentDidUpdate(prevProps) {
    let search_value = queryString.parse(this.props.location.search);
    let prev_search_value = queryString.parse(prevProps.location.search);
    if (search_value.search_query !== prev_search_value.search_query) {
      this.props.getSearchArticles(3, 1, search_value.search_query);
    }
  }

  handleScroll = (e, scrolling, totalPages, page, per) => {
    e.stopPropagation();
    const container = document.getElementById("container");
    const offset = document.getElementById("offset");
    const target = document.getElementById("target");
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
    if (container && offset && target) {
      container.scrollTop <= 1100 &&
        container.scrollTop > 400 &&
        this.setState({ hideScrollTopButton: false });

      container.scrollTop <= 400 &&
        container.scrollTop >= 100 &&
        this.setState({ hideScrollTopButton: true });

      if (scrolling) return;
      if (totalPages <= page) return;

      const targetOffset = target.offsetTop;
      const containerOffset = container.offsetTop + container.clientHeight;
      const pageOffset = container.scrollTop + offset.offsetTop;

      let result = pageOffset + containerOffset;
      if (result > targetOffset + (container.offsetTop - container.scrollTop)) {
        let search_value = queryString.parse(this.props.location.search);
        this.props.getMoreArticles(3, page + 1, search_value.search_query);
      }
    }
  };

  escapeRegex = text => {
    return text.replace(/[\s]/g, "+");
  };

  onSearchChange = event => {
    this.setState({ search: event.target.value });
  };

  onSearchSubmit = () => {
    let search_query = this.escapeRegex(this.state.search);
    this.props.history.push(`/articles/results?search_query=${search_query}`);
    if (search_query !== "") {
      this.props.getSearchArticles(3, 1, search_query);
    } else {
      this.props.history.push(`/articles`);
    }
  };

  render() {
    const container = document.getElementById("container");
    const {
      scrolling,
      totalPages,
      page,
      per,
      articles,
      loading,
      count,
      init_loading
    } = this.props.articles;
    let endLoad, loader_icon, main, searchResult;
    let contentClass = classNames({
      "content-container": true,
      expand: this.state.expandContent
    });

    let result_text = "results";
    if (articles.length === 1) result_text = "result";
    let search_value = queryString.parse(this.props.location.search);

    if (articles.length > 1 && !init_loading && !scrolling && !init_loading) {
      searchResult = (
        <div className="row">
          <div className="col-12 col-lg-8 col-xl-8 center-div reset-padding">
            <div className="search-results-box">
              <div className="fadeInEnd-quick">
                Displaying {articles.length} out of {count} {result_text}{" "}
                matching <span> "{search_value.search_query}"</span>. Scroll
                down to show more.
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      searchResult = "";
    }

    if (
      articles.length > 0 &&
      totalPages === page &&
      page >= 1 &&
      !loading &&
      !init_loading
    ) {
      endLoad = <div className="fadeInEnd">You've reached the end.</div>;
      searchResult = (
        <div className="row">
          <div className="col-12 col-lg-8 col-xl-8 center-div reset-padding">
            <div className="search-results-box">
              <div className="fadeInEnd-quick">
                Found {articles.length} {result_text} matching
                <span> "{search_value.search_query}"</span>.
              </div>
            </div>
          </div>
        </div>
      );
    }

    loading ? (loader_icon = <LoaderSmall />) : (loader_icon = "");

    articles === null || init_loading
      ? (main = (
          <LoaderRolling
            msg={"Loading Articles..."}
            textColor="#1f272b"
            margin="50px auto"
          />
        ))
      : (main = <ArticlesFeed articles={articles} />);

    if (articles.length === 0 && !init_loading) {
      main = "";
      searchResult = (
        <div className="row">
          <div className="col-12 col-lg-8 col-xl-8 center-div reset-padding">
            <div className="search-results-box">
              <div className="fadeInEnd-quick">
                Oops! Coudn't find any results matching
                <span> "{search_value.search_query}".</span>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <Navigation hideTopNav={this.state.hideTopNav} />
        <div className="wrapper_main">
          <div
            id="container"
            className={contentClass}
            onScroll={e =>
              this.handleScroll(e, scrolling, totalPages, page, per)
            }
          >
            <div id="offset">
              <div className="row">
                <div className="col-12 col-lg-2 col-xl-2 reset-padding" />
                <div className="col-12 col-lg-8 col-xl-8 reset-padding">
                  <div className="text-center">{searchResult}</div>
                  {main}
                  {loader_icon}
                </div>
                <div className="col-12 col-lg-2 col-xl-2 reset-padding" />
              </div>
              {endLoad}
              <div id="target">
                <ScrollToTop
                  hideScrollTopButton={this.state.hideScrollTopButton}
                  container={container}
                  scrollStepInPx="50"
                  delayInMs="5"
                  customScroll={true}
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

ArticlesSearch.propTypes = {
  articles: PropTypes.object.isRequired,
  getSearchArticles: PropTypes.func.isRequired,
  getMoreArticles: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  articles: state.articles,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getSearchArticles, getMoreArticles }
)(withRouter(ArticlesSearch));
