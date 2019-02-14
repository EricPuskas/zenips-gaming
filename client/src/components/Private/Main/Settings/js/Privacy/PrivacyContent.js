import React from "react";
import Parser from "html-react-parser";
import { Link } from "react-router-dom";
const PrivacyContent = ({ privacy_policy, deletePrivacy }) => {
  let content = Parser(privacy_policy.content);
  let controls;
  if (privacy_policy.content.length > 0) {
    controls = (
      <div className="col-12 content-control-buttons">
        <Link className="btn btn-green-d" to="/dashboard/settings/privacy/edit">
          <i className="far fa-edit" /> Edit
        </Link>
        <button className="btn btn-red-c" onClick={() => deletePrivacy()}>
          <i className="fas fa-trash-alt" /> Delete
        </button>
      </div>
    );
  } else {
    controls = (
      <div className="col-12 content-control-buttons">
        <Link className="btn btn-green-d" to="/dashboard/settings/privacy/edit">
          <i className="fas fa-plus" /> New
        </Link>
      </div>
    );
  }
  return (
    <div>
      <div className="row">
        {controls}
        <div className="content-box-holder">{content}</div>
      </div>
    </div>
  );
};

export default PrivacyContent;
