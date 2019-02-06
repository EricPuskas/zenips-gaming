import React from "react";
import Tabs from "../../Tabs/Tabs";
import InputGroup from "../../InputGroup";

const Body = ({
  onCloseModal,
  thumbnail,
  thumbnail_file,
  submitForm,
  changeInput,
  changeInputURL
}) => {
  return (
    <form>
      <hr />
      <div className="modal-body">
        <Tabs>
          <div label="Insert URL">
            <div className="thumbnail-form-body">
              <img
                src={thumbnail}
                alt="article thumbnail"
                className="article-thumbnail-edit"
              />
              <div className="text-center thumbnail-insert-url center-div">
                <InputGroup
                  placeholder="Insert URL"
                  name="thumbnail"
                  type="text"
                  maxLength="500"
                  value={thumbnail}
                  icon="fas fa-link"
                  onChange={e => changeInputURL(e)}
                />
              </div>
            </div>
          </div>
          <div label="Choose file from PC">
            <div className="thumbnail-form-body">
              <img
                src={thumbnail_file}
                alt="article thumbnail"
                className="article-thumbnail-edit"
              />
              <div className="text-center">
                <input
                  type="file"
                  id="thumbnail_file"
                  onChange={e => changeInput(e)}
                  name="thumbnail_file"
                  className="thumbnail-choose-file"
                />
              </div>
            </div>
          </div>
        </Tabs>
      </div>
      <div className="modal-footer-bio text-center">
        <button
          className="btn btn-green-c"
          type="button"
          onClick={() => submitForm()}
        >
          <i className="fas fa-check-circle" /> Ok
        </button>
        <button
          className="btn btn-red-c"
          type="button"
          onClick={() => onCloseModal()}
        >
          <i className="fas fa-times-circle" /> Cancel
        </button>
      </div>
    </form>
  );
};

export default Body;
