import React from "react";
import classNames from "classnames";

const NotFound = ({ expandContent }) => {
  let mainContainer = classNames({
    "main-container": true,
    minContent: expandContent,
    maxContent: !expandContent
  });
  return (
    <div className={mainContainer}>
      <div className="row">
        <div className="col-12 col-lg-3 col-xl-3 center-div text-center">
          <h1>
            <i className="fas fa-exclamation-triangle" /> Page Not found!
          </h1>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
