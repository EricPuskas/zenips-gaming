import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextArea = ({
  id,
  name,
  value,
  error,
  profileFormGroup,
  onChange,
  rows,
  maxLength,
  large
}) => {
  return (
    <div className="form-group">
      <textarea
        id={id}
        className={classnames("form-control", {
          "is-invalid": error,
          "profile-form-group": profileFormGroup,
          "form-control-txt-lg": large
        })}
        name={name}
        onChange={onChange}
        value={value}
        maxLength={maxLength}
        rows={rows}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default TextArea;
