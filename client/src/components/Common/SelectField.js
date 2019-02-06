import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const SelectField = ({
  name,
  defaultValue,
  disabled,
  options,
  error,
  onChange,
  profileFormGroup,
  large
}) => {
  return (
    <div className="form-group">
      <select
        disabled={disabled}
        onChange={onChange}
        className={classnames("form-control", {
          "is-invalid": error,
          "profile-form-group": profileFormGroup,
          "form-control-lg": large
        })}
        name={name}
      >
        <option defaultValue value={defaultValue}>
          {defaultValue}
        </option>
        {options}
      </select>
      {error && <div className="errorMsg">{error}</div>}
    </div>
  );
};

SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  defaultValue: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default SelectField;
