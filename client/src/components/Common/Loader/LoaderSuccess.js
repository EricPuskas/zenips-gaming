import React from "react";
import "./Loader.css";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

export default ({ msg, margin }) => {
  return (
    <div
      className="spinner-loader"
      style={{ margin}}
    >
      <div className="check_mark">
        <div className="sa-icon sa-success animate">
          <span className="sa-line sa-tip animateSuccessTip" />
          <span className="sa-line sa-long animateSuccessLong" />
          <div className="sa-placeholder" />
          <div className="sa-fix" />
        </div>
      </div>
      <div className="text-center" style={{ marginTop: "10px" }}>
        <CSSTransitionGroup
          transitionName="check-animation"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnter={false}
          transitionLeave={false}
        >
          <h3>{msg}</h3>
        </CSSTransitionGroup>
      </div>
    </div>
  );
};
