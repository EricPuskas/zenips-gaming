import React, { Component } from "react";
import classNames from "classnames";
import "./ScrollToTop.css";

class ScrollToTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalId: 0,
      count: 0
    };
  }

  scrollStep = () => {
    if (this.props.container) {
      if (this.props.container.scrollTop === 0) {
        clearInterval(this.state.intervalId);
      }
      this.props.container.scroll(
        0,
        this.props.container.scrollTop - this.props.scrollStepInPx
      );
    }
    return;
  };

  scrollToTop = () => {
    let intervalId = setInterval(this.scrollStep, this.props.delayInMs);
    this.setState({ intervalId: intervalId });
  };

  render() {
    let scroll = classNames({
      scroll: !this.props.customScroll,
      "custom-scroll": this.props.customScroll,
      "hide-scroll-button": this.props.hideScrollTopButton
    });
    return (
      <button
        title="Back to top"
        className={scroll}
        onClick={() => {
          this.scrollToTop();
        }}
      >
        <span className="arrow-up">
          <i className="fas fa-arrow-up" />
        </span>
      </button>
    );
  }
}

export default ScrollToTop;
