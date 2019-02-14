import React from "react";
import Parser from "html-react-parser";
const PrivacyContent = ({ privacy_policy }) => {
  let content = Parser(privacy_policy.content);
  return (
    <div>
      <div className="row">
        <div className="content-box-holder">{content}</div>
      </div>
    </div>
  );
};

export default PrivacyContent;
