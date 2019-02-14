import React from "react";
import Parser from "html-react-parser";
const AboutContent = ({ about }) => {
  let content = Parser(about.content);
  return (
    <div>
      <div className="row">
        <div className="content-box-holder">{content}</div>
      </div>
    </div>
  );
};

export default AboutContent;
