// Dependencies
import React from "react";
import PropTypes from "prop-types";

// Components
import TinyEditor from "../../../../../Common/TextEditor/TinyEditor";
import Tabs from "../../../../../Common/Tabs/Tabs";
import ArticlesGeneral from "./ArticlesGeneral";

//Utils
import status from "../../../../../../utils/status";

const ArticlesForm = ({
  title,
  user,
  content,
  preview,
  submitForm,
  changeContent,
  changeInput,
  error,
  defaultTag,
  defaultStatus,
  thumbnail,
  thumbnail_author,
  thumbnail_source,
  loadModal,
  updateThumbnail,
  updateThumbnailFile,
  updateThumbnailCredits,
  action,
  tags,
  goBack
}) => {
  let buttonText, title_err, content_err, preview_err, page_title;
  if (error) {
    title_err = error.title;
    content_err = error.content;
    preview_err = error.preview;
  }
  const filteredStatus = status.filter(
    status => status.props.value !== defaultStatus
  );

  action === "update" ? (buttonText = "Update") : (buttonText = "Submit");
  action === "update"
    ? (page_title = "Edit Article")
    : (page_title = "New Article");
  return (
    <div>
      <div className="container-fluid text-editor">
        <div className="row">
          <div className="col-12" style={{ zIndex: "10001" }}>
            <form onSubmit={submitForm}>
              <div className="row">
                <div className="col-12">
                  <div className="article-form">
                    <h1
                      style={{
                        position: "absolute",
                        float: "left",
                        paddingLeft: "2rem"
                      }}
                    >
                      {page_title}
                    </h1>
                    <Tabs>
                      <div label="General">
                        <ArticlesGeneral
                          title={title}
                          preview={preview}
                          changeInput={changeInput}
                          user={user}
                          buttonText={buttonText}
                          title_err={title_err}
                          preview_err={preview_err}
                          defaultTag={defaultTag}
                          defaultStatus={defaultStatus}
                          tags={tags}
                          status={filteredStatus}
                          thumbnail={thumbnail}
                          thumbnail_author={thumbnail_author}
                          thumbnail_source={thumbnail_source}
                          submitForm={submitForm}
                          error={error}
                          loadModal={loadModal}
                          updateThumbnail={updateThumbnail}
                          updateThumbnailFile={updateThumbnailFile}
                          updateThumbnailCredits={updateThumbnailCredits}
                        />
                      </div>
                      <div label="Content">
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
                    </Tabs>
                  </div>
                </div>
                <div
                  className="col-12 text-center"
                  style={{ paddingTop: "0.5rem" }}
                >
                  <div>
                    <button
                      type="button"
                      className="btn btn-primary btn-lg"
                      onClick={() => goBack()}
                    >
                      <i className="fas fa-arrow-circle-left" /> Back
                    </button>
                    <button type="submit" className="btn btn-green-d">
                      <i className="fas fa-check-circle" /> {buttonText}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

ArticlesForm.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  submitForm: PropTypes.func.isRequired,
  changeInput: PropTypes.func.isRequired,
  changeContent: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default ArticlesForm;
