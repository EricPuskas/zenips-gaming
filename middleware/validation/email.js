const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateEmailInput(data) {
  let errors = {};

  // Use Custom isEmpty function
  data.email = !isEmpty(data.email) ? data.email : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email field is invalid.";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
