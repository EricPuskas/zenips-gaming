import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
class InputGroup extends React.Component {
  constructor() {
    super();
    this.state = {
      show_pw: false
    };
  }

  toggleShowPw = () => {
    this.setState(prevState => {
      return { show_pw: !prevState.show_pw };
    });
  };

  render() {
    const {
      name,
      placeholder,
      value,
      error,
      icon,
      type,
      onChange,
      onClick,
      profileFormGroup,
      maxLength,
      regcode
    } = this.props;
    let showPw;
    let inputType = type;
    const { show_pw } = this.state;
    if (type === "password" && show_pw === false) {
      showPw = (
        <div
          className="input-group-prepend"
          onClick={() => this.toggleShowPw()}
        >
          <span className="input-group-text">
            <i className="far fa-eye-slash" />
          </span>
        </div>
      );
    }
    if (show_pw) inputType = "text";
    if (inputType === "text" && show_pw === true) {
      showPw = (
        <div
          className="input-group-prepend"
          onClick={() => this.toggleShowPw()}
        >
          <span className="input-group-text">
            <i className="far fa-eye" />
          </span>
        </div>
      );
    }
    return (
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className={icon} />
          </span>
        </div>
        <input
          className={classnames("form-control", {
            "is-invalid": error,
            "profile-form-group": profileFormGroup,
            regcode: regcode
          })}
          placeholder={placeholder}
          name={name}
          maxLength={maxLength}
          onChange={onChange}
          value={value}
          type={inputType}
          onClick={onClick}
        />
        {showPw}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    );
  }
}
InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  icon: PropTypes.string,
  type: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

InputGroup.defaultProps = {
  type: "text"
};

export default InputGroup;
