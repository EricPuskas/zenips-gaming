import React from "react";
import TextField from "../../../../../Common/TextField";
import SelectField from "../../../../../Common/SelectField";
import TextArea from "../../../../../Common/TextArea";
import ArticlesGuide from "./ArticlesGuide";

const ArticlesGeneral = ({
  title,
  title_err,
  changeInput,
  submitForm,
  defaultTag,
  defaultStatus,
  tags,
  status,
  preview,
  preview_err,
  thumbnail,
  thumbnail_author,
  thumbnail_source,
  loadModal,
  updateThumbnail,
  updateThumbnailFile,
  updateThumbnailCredits,
  error
}) => {
  let THUMBNAIL_MODAL_PROPS = {
    thumbnail,
    width: "60%",
    left: "20%",
    submitForm,
    updateThumbnail,
    updateThumbnailFile,
    changeInput,
    error
  };
  let CREDITS_MODAL_PROPS = {
    thumbnail_author,
    thumbnail_source,
    width: "30%",
    left: "40%",
    updateThumbnailCredits,
    changeInput,
    error
  };
  return (
    <div className="row">
      <div className="col-12 col-lg-7 col-xl-7">
        <div className="row">
          <div className="col-lg-12 col-xl-12">
            <label>Title ({75 - title.length} characters left.)</label>
            <TextField
              large={true}
              placeholder="Title"
              profileFormGroup={true}
              name="title"
              value={title}
              limit="75"
              onChange={e => changeInput(e)}
              error={title_err}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-xl-12">
            <ArticlesGuide />
          </div>
        </div>
      </div>
      <div className="col-12 col-lg-5 col-xl-5">
        <div className="row">
          <div className="col-12 col-lg-12 col-xl-12">
            <label>
              {" "}
              Thumbnail{" "}
              <button
                className="btn btn-yellow-c"
                type="button"
                onClick={() =>
                  loadModal("THUMBNAIL_MODAL", THUMBNAIL_MODAL_PROPS)
                }
              >
                <i className="fas fa-edit" />
              </button>
              <button
                className="btn btn-green-d"
                type="button"
                onClick={() => loadModal("CREDITS_MODAL", CREDITS_MODAL_PROPS)}
              >
                <i className="far fa-copyright" />
              </button>
            </label>
            <img
              src={thumbnail}
              alt="1280x720 placeholder"
              className="placeholder-720p"
            />
          </div>
          <div className="col-12 col-lg-6 col-xl-6">
            <label>Status</label>
            <SelectField
              large={true}
              name="status"
              onChange={e => changeInput(e)}
              profileFormGroup={true}
              defaultValue={defaultStatus}
              options={[status]}
            />
          </div>
          <div className="col-12 col-lg-6 col-xl-6">
            <label>Choose tag</label>
            <SelectField
              large={true}
              name="tag"
              onChange={e => changeInput(e)}
              profileFormGroup={true}
              defaultValue={defaultTag}
              options={[tags]}
            />
          </div>
          <div className="col-lg-12 col-xl-12">
            <label>
              Preview Paragraph ({300 - preview.length} characters left.)
            </label>
            <TextArea
              id="article-textarea"
              large={true}
              name="preview"
              value={preview}
              error={preview_err}
              onChange={e => changeInput(e)}
              maxLength="300"
              rows="4"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlesGeneral;
