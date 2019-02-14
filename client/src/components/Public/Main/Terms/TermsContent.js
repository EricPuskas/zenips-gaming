import React from "react";
import Parser from "html-react-parser";
const TermsContent = ({ terms_of_use }) => {
  let content = Parser(terms_of_use.content);
  return (
    <div>
      <div className="row">
        <div className="content-box-holder">{content}</div>
      </div>
    </div>
  );
};

export default TermsContent;
