import React from "react";
import TextArea from "../../TextArea";

const Body = ({ value, error, onChange }) => {
  return (
    <div className="modal-body modal-body-bio">
      <TextArea
        id="bio-textarea"
        name="bio"
        value={value}
        error={error}
        onChange={onChange}
        maxLength="700"
        rows="7"
      />
      <div className="char-count-bio">
        <span>Characters left: {700 - value.length} out of 700</span>
      </div>
    </div>
  );
};

export default Body;
