// Dependencies
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames";
// Actions
import {
  getInitPatchNotes,
  getMorePatchNotes
} from "../../../../actions/patchNotesActions";
// Utilities
import isEmpty from "../../../../utils/isEmpty";
// Components
import PatchNotesFeed from "./js/PatchNotesFeed";
import ScrollToTop from "../../../Common/ScrollToTop/ScrollToTop";
import LoaderLarge from "../../../Common/Loader/LoaderLarge";
import LoaderSmall from "../../../Common/Loader/LoaderSmall";
import Note from "../../Side/Note/Note";

class PatchNotes extends Component {
  constructor() {
    super();
    this.state = {
      hideScrollTopButton: true,
      mobile: false
    };
  }

  componentDidMount() {
    document.title = "Zenips Gaming | Patch Notes";
    if (window.innerWidth <= 414) {
      this.setState(prevState => {
        return { mobile: !prevState.mobile };
      });
    }
    const { per, page, patch_notes } = this.props.patch_notes;
    if (isEmpty(patch_notes)) {
      this.props.getInitPatchNotes(per, page);
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
      result > targetOffset + (container.offsetTop - 1000) &&
        this.props.getMorePatchNotes(per, page + 1);
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
      patch_notes,
      loading,
      init_loading
    } = this.props.patch_notes;
    let main,
      side,
      endLoad,
      loader_icon = "";
    this.state.mobile ? (side = "") : (side = <Note />);

    let mainContainer = classNames({
      "main-container": true,
      minContent: expandContent,
      maxContent: !expandContent
    });

    let topControls = classNames({
      "btn btn-blue-l top-control-item": true,
      minContent: expandContent,
      maxContent: !expandContent
    });

    if (totalPages === page && page > 1 && !loading) {
      side = <Note />;
      endLoad = <div className="fadeInEnd">You've reached the end.</div>;
    }

    loading ? (loader_icon = <LoaderSmall />) : (loader_icon = "");

    patch_notes === null || init_loading
      ? (main = <LoaderLarge msg={"Loading Content. Please wait."} />)
      : (main = <PatchNotesFeed patch_notes={patch_notes} />);

    return (
      <div
        id="container"
        className={mainContainer}
        onScroll={() => this.handleScroll(scrolling, totalPages, page, per)}
      >
        <div id="offset">
          <div className="top-controls-fixed">
            <Link to="/dashboard/patchnotes/new">
              <button className={topControls}>
                <i className="fas fa-plus" /> New
              </button>
            </Link>
          </div>
          <div className="row">
            <div className="col-12 col-lg-8 col-xl-8">
              {main}
              {loader_icon}
            </div>
            <div className="col-12 col-lg-4 col-xl-4">{side}</div>
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

PatchNotes.propTypes = {
  patch_notes: PropTypes.object.isRequired,
  getInitPatchNotes: PropTypes.func.isRequired,
  getMorePatchNotes: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  patch_notes: state.patch_notes
});

export default connect(
  mapStateToProps,
  { getInitPatchNotes, getMorePatchNotes }
)(PatchNotes);
