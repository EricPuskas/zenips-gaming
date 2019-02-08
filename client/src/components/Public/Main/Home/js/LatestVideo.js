import React, { Component } from "react";
import ytOptimizer from "../../../../../utils/ytOptimizer";

class LatestVideo extends Component {
  componentDidMount() {
    ytOptimizer();
  }
  render() {
    const { id } = this.props;
    return (
      <div className="latest-post-container text-center">
        <h1>Latest Video</h1>
        <div className="embed-responsive embed-responsive-16by9">
          <div
            className="yt-player"
            data-id={id}
            data-related="0"
            data-control="1"
            data-info="1"
            data-fullscreen="1"
          >
            <img
              src={`//i.ytimg.com/vi/${id}/maxresdefault.jpg`}
              alt="youtube video"
            />
            <div className="yt-player-control">&nbsp;</div>
          </div>
        </div>
      </div>
    );
  }
}

export default LatestVideo;
