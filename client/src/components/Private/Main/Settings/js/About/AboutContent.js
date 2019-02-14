import React from "react";
import Parser from "html-react-parser";
import { Link } from "react-router-dom";
const AboutContent = ({ about, deleteAbout }) => {
  let content = Parser(about.content);
  let controls;
  if (about.content.length > 0) {
    controls = (
      <div className="col-12 content-control-buttons">
        <Link className="btn btn-green-d" to="/dashboard/settings/about/edit">
          <i className="far fa-edit" /> Edit
        </Link>
        <button className="btn btn-red-c" onClick={() => deleteAbout()}>
          <i className="fas fa-trash-alt" /> Delete
        </button>
      </div>
    );
  } else {
    controls = (
      <div className="col-12 content-control-buttons">
        <Link className="btn btn-green-d" to="/dashboard/settings/about/edit">
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

export default AboutContent;
