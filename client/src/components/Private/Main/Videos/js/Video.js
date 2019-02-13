import React, { Component } from "react";
import classNames from "classnames";
import Moment from "react-moment";
import lozad from "lozad";
import ytOptimizer from "../../../../../utils/ytOptimizer";
class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };
  }
  componentDidMount() {
    const observer = lozad(); // lazy loads elements with default selector as '.lozad'
    observer.observe();
    ytOptimizer();
  }
  toggleSelected = id => {
    if (this.state.selected === false) {
      this.setState({ selected: true });
      this.props.addVideoToArray(id);
    } else {
      this.setState({ selected: false });
      this.props.removeVideoFromArray(id);
    }
  };

  render() {
    let videoClasses = classNames({
      "video-item": true,
      "video-selected": this.state.selected
    });
    const { video } = this.props;
    return (
      <div className="col-12 col-lg-4 col-xl-4">
        <div
          className={videoClasses}
          onClick={() => this.toggleSelected(video._id)}
        >
          <h1>{video.title}</h1>
          <input type="hidden" name="tag" value={video._id} />
          <div className="embed-responsive embed-responsive-16by9">
            <div
              className="yt-player"
              data-id={video.url}
              data-related="0"
              data-control="1"
              data-info="1"
              data-fullscreen="1"
            >
              <img
                data-src={`//i.ytimg.com/vi/${video.url}/sddefault.jpg`}
                src="https://res.cloudinary.com/zenipsstudio/image/upload/fl_lossy,q_auto:low/v1550092423/mobius-placeholder-4.jpg"
                alt={video.title}
                className="lozad img-responsive"
              />
              <div className="yt-player-control">&nbsp;</div>
            </div>
          </div>
          <span>
            <i className="far fa-clock" />{" "}
            <Moment format="MMMM DD, YYYY h:mm A">{video.createdAt}</Moment>
          </span>
        </div>
      </div>
    );
  }
}

export default Video;
