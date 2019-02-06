import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { connect } from "react-redux";
// Actions
import {
  getInitArticles,
  getMoreArticles
} from "../../../../actions/articleActions";
// Components
import ArticlesFeed from "./js/Browse/ArticlesFeed";
import LoaderLarge from "../../../Common/Loader/LoaderLarge";
import LoaderSmall from "../../../Common/Loader/LoaderSmall";
import ScrollToTop from "../../../Common/ScrollToTop/ScrollToTop";
import SearchEngine from "../../../Common/SearchEngine/SearchEngine";

class Articles extends Component {
  constructor() {
    super();
    this.state = {
      hideScrollTopButton: true,
      search: ""
    };
  }
  componentDidMount() {
    document.title = "Zenips Gaming | Articles";
    const { per, page } = this.props.articles;
    this.props.getInitArticles(per, page, this.state.search);
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
        this.props.getMoreArticles(per, page + 1, this.state.search);
      }
    }
  };

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
      init_loading
    } = this.props.articles;

    let endLoad,
      loader_icon = "";
    let main = <ArticlesFeed articles={articles} />;

    let mainContainer = classNames({
      "main-container": true,
      minContent: expandContent,
      maxContent: !expandContent
    });

    if (articles.length > 0 && totalPages === page && page > 1 && !loading) {
      endLoad = <div className="fadeInEnd">You've reached the end.</div>;
    }

    loading ? (loader_icon = <LoaderSmall />) : (loader_icon = "");

    if (articles === null || init_loading) {
      main = (
        <LoaderLarge
          msg={"Loading data. Please wait."}
          margin="5vh 5vh 5vh 0"
        />
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
            <div className="col-12">
              <div className="text-center">
                <h1>Browse Articles</h1>
                <SearchEngine
                  onSearchSubmit={this.onSearchSubmit}
                  onSearchChange={this.onSearchChange}
                />
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

Articles.propTypes = {
  articles: PropTypes.object.isRequired,
  getInitArticles: PropTypes.func.isRequired,
  getMoreArticles: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  articles: state.articles
});

export default connect(
  mapStateToProps,
  { getInitArticles, getMoreArticles }
)(Articles);
