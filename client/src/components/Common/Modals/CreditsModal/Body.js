import React from "react";
import TextField from "../../TextField";

const Body = ({
  thumbnail_author,
  thumbnail_source,
  submitForm,
  error,
  onChange,
  onCloseModal,
  credit,
  handleCheckbox
}) => {
  return (
    <div>
      <div className="modal-body">
        <div className="credits-form-body">
          <input
            type="checkbox"
            name="credit"
            checked={credit}
            onChange={e => handleCheckbox(e)}
          />{" "}
          The thumbnail used is the intelectual property of another
          company/person.
          <div className="credit-details">
            <label>Thumbnail Author</label>
            <TextField
              name="thumbnail_author"
              value={thumbnail_author}
              type="text"
              placeholder={thumbnail_author}
              error={error}
              disabled={!credit}
              onChange={onChange}
            />
            <small>
              Name of the company/person who will receive credit for the
              thumbnail.
            </small>
          </div>
          <div className="credit-details">
            <label>Thumbnail Source</label>
            <TextField
              name="thumbnail_source"
              value={thumbnail_source}
              type="text"
              placeholder={thumbnail_source}
              error={error}
              disabled={!credit}
              onChange={onChange}
            />
            <small>
              Link to website/social media of the company/person who will
              receive credit for the thumbnail.
            </small>
          </div>
        </div>
      </div>
      <div className="modal-footer-bio text-center">
        <button
          className="btn btn-green-c"
          onClick={() => submitForm(thumbnail_author, thumbnail_source)}
        >
          <i className="fas fa-check-circle" /> Save
        </button>
        <button className="btn btn-red-c" onClick={() => onCloseModal()}>
          <i className="fas fa-times-circle" /> Cancel
        </button>
      </div>
    </div>
  );
};

export default Body;
