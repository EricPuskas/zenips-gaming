import React, { Component } from "react";
import Moment from "react-moment";
import lozad from "lozad";
import ytOptimizer from "../../../../../utils/ytOptimizer";
class Video extends Component {
  componentDidMount() {
    const observer = lozad(); // lazy loads elements with default selector as '.lozad'
    observer.observe();
    ytOptimizer();
  }
  render() {
    const { video } = this.props;
    return (
      <div className="col-12 col-lg-6 col-xl-6 noPaddingMobile">
        <div className="video-item-p">
          <h1>{video.title}</h1>
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
                alt="youtube video"
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
