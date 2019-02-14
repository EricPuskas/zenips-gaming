import React from "react";
import Parser from "html-react-parser";
const CookiesContent = ({ cookies }) => {
  let content = Parser(cookies.content);
  return (
    <div>
      <div className="row">
        <div className="content-box-holder">{content}</div>
      </div>
    </div>
  );
};

export default CookiesContent;
