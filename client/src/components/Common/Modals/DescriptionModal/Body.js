import React from "react";
import TextArea from "../../TextArea";

const Body = ({ value, error, onChange }) => {
  let charcount;
  value
    ? (charcount = (
        <span>Characters left: {200 - value.length} out of 200</span>
      ))
    : (charcount = null);
  return (
    <div className="modal-body modal-body-bio">
      <TextArea
        id="description-textarea"
        name="description"
        value={value}
        error={error}
        onChange={onChange}
        maxLength="200"
        rows="3"
      />
      <div className="char-count-bio">{charcount}</div>
    </div>
  );
};

Body.defaultProps = {
  value: ""
};

export default Body;
