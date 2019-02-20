const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.reg_code = !isEmpty(data.reg_code) ? data.reg_code : "";
  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.username = !isEmpty(data.username) ? data.username : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password_confirm = !isEmpty(data.password_confirm)
    ? data.password_confirm
    : "";

  if (data.reg_code !== process.env.REG_CODE) {
    errors.reg_code = "The registration code is invalid.";
  }
  if (Validator.isEmpty(data.reg_code)) {
    errors.reg_code = "The registration code is required.";
  }

  if (!Validator.isLength(data.username, { min: 3, max: 40 })) {
    errors.username = "Username must be between 3 and 40 characters";
  }

  if (!Validator.isLength(data.firstName, { min: 2, max: 40 })) {
    errors.firstName = "First name must be between 2 and 40 characters";
  }

  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = "First Name field is required.";
  }

  if (!Validator.isLength(data.lastName, { min: 2, max: 40 })) {
    errors.lastName = "Last name must be between 2 and 40 characters";
  }

  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = "Last Name field is required.";
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required.";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required.";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email field is invalid.";
  }

  let lowerRegex = /[a-z]/;
  let upperRegex = /[A-Z]/;
  let numberRegex = /[0-9]/;
  let specialRegex = /[$@$!%*?&]/;

  if (!data.password.match(lowerRegex))
    errors.password = "Password must contain at least one lowercase letter.";
  if (!data.password.match(upperRegex))
    errors.password = "Password must contain at least one uppercase letter.";
  if (!data.password.match(numberRegex))
    errors.password = "Password must contain at least one number.";
  if (!data.password.match(specialRegex))
    errors.password = "Password must contain at least a special character";
  if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
    errors.password = "Password must be between 8 and 30 characters.";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required.";
  }

  if (Validator.isEmpty(data.password_confirm)) {
    errors.password_confirm = "You must confirm the password.";
  }

  if (!Validator.equals(data.password, data.password_confirm)) {
    errors.password_confirm = "Passwords must match.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
