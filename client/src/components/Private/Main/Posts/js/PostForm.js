// Dependencies
import React from "react";
import PropTypes from "prop-types";
// Components
import TextField from "../../../../Common/TextField";
import TinyEditor from "../../../../Common/TextEditor/TinyEditor";

const PostForm = ({
  title,
  content,
  submitPost,
  changeContent,
  changePostInput,
  error_title,
  error_content,
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
            <form onSubmit={submitPost}>
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
                    onChange={e => changePostInput(e)}
                    error={error_title}
                  />
                </div>
                <div className="col-12">
                  <TinyEditor
                    id="text_editor"
                    onEditorChange={content => changeContent(content)}
                    value={content}
                    error={error_content}
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

PostForm.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  submitPost: PropTypes.func.isRequired,
  changePostInput: PropTypes.func.isRequired,
  changeContent: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default PostForm;
