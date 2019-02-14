// Dependencies
import React from "react";
import PropTypes from "prop-types";
// Components
import TinyEditor from "../../../../../Common/TextEditor/TinyEditor";

const PrivacyForm = ({
  content,
  submitForm,
  changeContent,
  action,
  goBack
}) => {
  let buttonText;
  action === "update" ? (buttonText = "Update") : (buttonText = "Submit");
  return (
    <div>
      <div className="container-fluid text-editor">
        <div className="row">
          <div className="col-12" style={{ zIndex: "10001" }}>
            <form onSubmit={submitForm}>
              <div className="row">
                <div
                  className="col-12 text-center"
                  style={{ paddingBottom: "15px" }}
                >
                  <button
                    className="btn btn-primary btn-lg"
                    type="button"
                    onClick={() => goBack()}
                  >
                    <i className="fas fa-arrow-circle-left" /> Back
                  </button>
                  <button type="submit" className="btn btn-green-d">
                    <i className="fas fa-check-circle" /> {buttonText}
                  </button>
                </div>
                <div className="col-12">
                  <TinyEditor
                    id="text_editor"
                    onEditorChange={content => changeContent(content)}
                    value={content}
                    name="content"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

PrivacyForm.propTypes = {
  content: PropTypes.string.isRequired,
  submitForm: PropTypes.func.isRequired,
  changeContent: PropTypes.func.isRequired
};

export default PrivacyForm;
