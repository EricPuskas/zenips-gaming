const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  // Use Custom isEmpty function
  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.role = !isEmpty(data.role) ? data.role : "";

  if (!Validator.isLength(data.firstName, { min: 2, max: 40 })) {
    errors.firstName = "First name needs to be between 2 and 40 characters.";
  }

  if (!Validator.isLength(data.lastName, { min: 2, max: 40 })) {
    errors.lastName = "Last name needs to be between 2 and 40 characters.";
  }

  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = "First name cannot be empty.";
  }

  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = "Last name cannot be empty.";
  }

  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "Invalid URL";
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "Invalid URL";
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "Invalid URL";
    }
  }

  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = "Invalid URL";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
