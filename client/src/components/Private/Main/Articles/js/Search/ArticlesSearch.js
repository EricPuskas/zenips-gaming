import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import SearchEngine from "../../../../../Common/SearchEngine/SearchEngine";
import {
  getSearchArticles,
  getMoreArticles
} from "../../../../../../actions/articleActions";
// Components
import ArticlesFeed from "./ArticlesFeed";
import LoaderLarge from "../../../../../Common/Loader/LoaderLarge";
import LoaderSmall from "../../../../../Common/Loader/LoaderSmall";
import ScrollToTop from "../../../../../Common/ScrollToTop/ScrollToTop";
import queryString from "query-string";

class ArticlesSearch extends Component {
  constructor() {
    super();
    this.state = {
      hideScrollTopButton: true,
      mobile: false,
      search: ""
    };
  }
  componentDidMount() {
    document.title = "Zenips Gaming | Articles";
    if (window.innerWidth <= 414) {
      this.setState(prevState => {
        return { mobile: !prevState.mobile };
      });
    }

    const { per, page } = this.props.articles;
    let search_value = queryString.parse(this.props.location.search);
    if (search_value.search_query !== "") {
      this.props.getSearchArticles(per, page, search_value.search_query);
    } else {
      this.props.history.push(`/dashboard/articles`);
    }
  }

  componentDidUpdate(prevProps) {
    const { per, page } = this.props.articles;
    let search_value = queryString.parse(this.props.location.search);
    let prev_search_value = queryString.parse(prevProps.location.search);
    if (search_value.search_query !== prev_search_value.search_query) {
      this.props.getSearchArticles(per, page, this.state.search);
    }
  }

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

      const targetOffset = target.offsetTop;
      const containerOffset = container.offsetTop + container.clientHeight;
      const pageOffset = container.scrollTop + offset.offsetTop;

      let result = pageOffset + containerOffset;
      if (result > targetOffset + (container.offsetTop - container.scrollTop)) {
        let search_value = queryString.parse(this.props.location.search);
        this.props.getMoreArticles(per, page + 1, search_value.search_query);
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
    const { per, page } = this.props.articles;
    let search_query = this.escapeRegex(this.state.search);
    this.props.history.push(
      `/dashboard/articles/results?search_query=${search_query}`
    );
    if (search_query !== "") {
      this.props.getSearchArticles(per, page, search_query);
    } else {
      this.props.history.push(`/dashboard/articles`);
    }
  };

  render() {
    const container = document.getElementById("container");
    const { expandContent } = this.props;
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
    let result_text = "results";
    if (articles.length === 1) result_text = "result";
    let search_value = queryString.parse(this.props.location.search);
    let main,
      endLoad,
      searchResult,
      loader_icon = "";
    let mainContainer = classNames({
      "main-container": true,
      minContent: expandContent,
      maxContent: !expandContent
    });

    if (articles.length > 1 && !init_loading && !scrolling && !init_loading) {
      searchResult = (
        <div className="row">
          <div className="col-12 col-lg-8 col-xl-8 center-div search-results-box">
            <div className="fadeInEnd-quick">
              Displaying {articles.length} out of {count} {result_text} matching{" "}
              <span> "{search_value.search_query}"</span>. Scroll down to show
              more.
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
          <div className="col-12 col-lg-8 col-xl-8 center-div search-results-box">
            <div className="fadeInEnd-quick">
              Found {articles.length} {result_text} matching
              <span> "{search_value.search_query}"</span>.
            </div>
          </div>
        </div>
      );
    }

    loading ? (loader_icon = <LoaderSmall />) : (loader_icon = "");

    articles === null || init_loading
      ? (main = <LoaderLarge msg={"Searching..."} marginTop="5%" />)
      : (main = <ArticlesFeed articles={articles} />);

    if (articles.length === 0 && !init_loading) {
      main = "";
      searchResult = (
        <div className="row">
          <div className="col-12 col-lg-8 col-xl-8 center-div search-results-box">
            <div className="fadeInEnd-quick">
              Oops! Coudn't find any results matching
              <span> "{search_value.search_query}".</span>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div
        id="container"
        className={mainContainer}
        onScroll={() => this.handleScroll(scrolling, totalPages, page, per)}
      >
        <div id="offset">
          <div className="row">
            <div className="col-12 col-lg-12 col-xl-12">
              <div className="text-center">
                <SearchEngine
                  onSearchSubmit={this.onSearchSubmit}
                  onSearchChange={this.onSearchChange}
                  value={this.state.search}
                />
                {searchResult}
              </div>
              {main}
              {loader_icon}
            </div>
          </div>
          {endLoad}
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
