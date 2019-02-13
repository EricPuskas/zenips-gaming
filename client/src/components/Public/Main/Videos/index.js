import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import LoaderRolling from "../../../Common/Loader/LoaderRolling";
import Navigation from "../../../Layout/Public/Navigation/Navigation";
import Footer from "../../../Layout/Public/Footer/Footer";
// Actions
import { getVideos } from "../../../../actions/videoActions";
import Video from "./js/Video";
import "./css/Videos.css";
let lastScrollTop = 0;
class Videos extends Component {
  constructor() {
    super();
    this.state = {
      display_update: false,
      hideFooter: false,
      hideTopNav: false,
      expandContent: false
    };
  }
  componentDidMount() {
    document.title = "Videos | Dashboard";
    this.props.getVideos();
  }
  handleScroll = e => {
    e.stopPropagation();
    const container = document.getElementById("container");
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
    lastScrollTop = st <= 0 ? 0 : st;
  };
  render() {
    const { init_loading, videos } = this.props.videos;
    const AllVideos = videos.map(video => (
      <Video key={video._id} video={video} />
    ));
    let contentClass = classNames({
      "content-container": true,
      expand: this.state.expandContent
    });
    let main;
    init_loading
      ? (main = (
          <LoaderRolling
            msg={"Loading Videos..."}
            textColor="#1f272b"
            margin="50px auto"
          />
        ))
      : (main = (
          <div>
            <div className="row">
              <div className="col-12 col-lg-6 col-xl-6 center-div text-center">
                <h1 className="title-sample">
                  <i className="far fa-play-circle" /> Videos
                </h1>
              </div>
            </div>
            <div className="row">
              <div className="col-12 text-center videos-container-p">
                <div className="row">{AllVideos}</div>
              </div>
            </div>
          </div>
        ));
    return (
      <div>
        <Navigation hideTopNav={this.state.hideTopNav} />
        <div className="wrapper_main">
          <div
            id="container"
            onScroll={e => this.handleScroll(e)}
            className={contentClass}
          >
            {main}
          </div>
        </div>
        <Footer hideFooter={this.state.hideFooter} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  videos: state.videos,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getVideos }
)(Videos);
