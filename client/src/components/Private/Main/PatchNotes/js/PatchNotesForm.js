// Dependencies
import React from "react";
import PropTypes from "prop-types";
// Components
import TextField from "../../../../Common/TextField";
import TinyEditor from "../../../../Common/TextEditor/TinyEditor";

const PatchNotesForm = ({
  title,
  content,
  submitForm,
  changeContent,
  changeInput,
  error,
  action,
  goBack
}) => {
  let buttonText;
  let title_err;
  let content_err;
  if (error) {
    title_err = error.title;
    content_err = error.content;
  }

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
                  <TextField
                    placeholder="Title"
                    name="title"
                    value={title}
                    onChange={e => changeInput(e)}
                    error={title_err}
                  />
                </div>
                <div className="col-12">
                  <TinyEditor
                    id="text_editor"
                    onEditorChange={content => changeContent(content)}
                    value={content}
                    error={content_err}
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

PatchNotesForm.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  submitForm: PropTypes.func.isRequired,
  changeInput: PropTypes.func.isRequired,
  changeContent: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default PatchNotesForm;
