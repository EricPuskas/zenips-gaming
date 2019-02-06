import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextField = ({
  name,
  placeholder,
  value,
  error,
  type,
  onChange,
  disabled,
  large,
  limit,
  profileFormGroup
}) => {
  return (
    <div className="form-group">
      <input
        type={type}
        className={classnames("form-control", {
          "is-invalid": error,
          "profile-form-group": profileFormGroup,
          "form-control-lg": large
        })}
        placeholder={placeholder}
        name={name}
        maxLength={limit}
        onChange={onChange}
        value={value}
        disabled={disabled}
      />
      {error && <div className="errorMsg">{error}</div>}
    </div>
  );
};

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

TextField.defaultProps = {
  type: "text"
};

export default TextField;
