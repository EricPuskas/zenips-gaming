import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import LoaderLarge from "../../../Common/Loader/LoaderLarge";
// Actions
import {
  getVideos,
  deleteVideos,
  addVideo,
  clearErrors
} from "../../../../actions/videoActions";
import Video from "./js/Video";
import InputGroup from "../../../Common/InputGroup";
import "./css/Videos.css";

class Videos extends Component {
  constructor() {
    super();
    this.state = {
      selected: [],
      video_title: "",
      video_url: "",
      videos: [],
      initMount: true,
      errors: {}
    };
  }
  componentDidMount() {
    this.props.clearErrors();
    window.addEventListener("keydown", this.listenKeyboard, false);
    document.title = "Videos | Dashboard";
    this.props.getVideos();
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.listenKeyboard, false);
  }
  listenKeyboard = event => {
    event.stopPropagation();
    if (event.which === 13 || event.keyCode === 13) {
      this.submitForm();
      this.setState({ video_title: "", video_url: "" });
    }
  };

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.errors) {
      return { errors: nextProps.errors };
    } else if (nextProps.videos.videos) {
      return { tags: nextProps.videos.videos };
    } else return null;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors) {
      this.setState(() => ({ errors: this.props.errors }));
    }
    if (prevProps.videos.videos !== this.props.videos.videos) {
      this.setState(() => ({ videos: this.props.videos.videos }));
    }
  }

  addVideoToArray = vid_id => {
    this.setState(prevState => ({
      selected: [...prevState.selected, vid_id],
      initMount: false
    }));
  };

  removeVideoFromArray = vid_id => {
    this.setState({
      selected: this.state.selected.filter(video => video !== vid_id)
    });
  };

  deleteSelected = () => {
    let data = {
      videos: this.state.selected
    };
    this.props.clearErrors();
    this.setState({ selected: [] });
    this.props.deleteVideos(data);
  };

  changeInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitForm = () => {
    this.props.clearErrors();
    const data = {
      title: this.state.video_title,
      url: this.state.video_url
    };
    this.props.addVideo(data);
    this.props.clearErrors();
  };
  render() {
    const { expandContent } = this.props;
    const { init_loading } = this.props.videos;
    const { error } = this.state.errors;
    const videosArr = this.state.videos;

    const AllVideos = videosArr.map(video => (
      <Video
        key={video._id}
        removeVideoFromArray={this.removeVideoFromArray}
        addVideoToArray={this.addVideoToArray}
        video={video}
      />
    ));
    let mainContainer = classNames({
      "main-container": true,
      minContent: expandContent,
      maxContent: !expandContent
    });
    let buttonDelClass = classNames({
      row: true,
      hide: this.state.initMount,
      show: !this.state.initMount
    });
    let main;
    init_loading
      ? (main = (
          <LoaderLarge msg={"Loading Videos... Please wait."} margin="0 auto" />
        ))
      : (main = AllVideos);
    return (
      <div className={mainContainer}>
        <div className="row">
          <div className="col-12 col-lg-6 col-xl-6 center-div text-center newTag-input">
            <h1>
              <i className="far fa-play-circle" /> Videos
            </h1>
            <InputGroup
              placeholder="Title"
              name="video_title"
              type="text"
              value={this.state.video_title}
              icon="far fa-play-circle"
              profileFormGroup={true}
              onChange={this.changeInput}
              error={error.title}
            />
            <InputGroup
              placeholder="toUD_aQO-To (https://www.youtube.com/watch?v=toUD_aQO-To), only the identifier. "
              name="video_url"
              type="text"
              value={this.state.video_url}
              icon="fas fa-link"
              profileFormGroup={true}
              onChange={this.changeInput}
              error={error.url}
            />
          </div>
        </div>
        <div className={buttonDelClass}>
          <div className="col-12 col-lg-3 col-xl-3 center-div text-center">
            <div>
              {" "}
              <button
                className="btn btn-red-c"
                disabled={!this.state.selected.length > 0}
                onClick={() => this.deleteSelected()}
              >
                Delete Selected
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center videos-container">
            <div className="row">{main}</div>
          </div>
        </div>
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
  { addVideo, getVideos, deleteVideos, clearErrors }
)(Videos);
