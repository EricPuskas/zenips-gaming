const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateMessageInput(data) {
  let errors = {};

  // Use Custom isEmpty function
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.subject = !isEmpty(data.subject) ? data.subject : "";
  data.content = !isEmpty(data.content) ? data.content : "";

  if (!Validator.isLength(data.name, { min: 2, max: 50 })) {
    errors.name = "Name must be between 2 and 50 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required.";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email field is invalid.";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required.";
  }

  if (!Validator.isLength(data.content, { min: 15, max: 500 })) {
    errors.content = "Content must be betweem 15 and 500 characters.";
  }

  if (Validator.isEmpty(data.content)) {
    errors.content = "The message can't be empty.";
  }

  if (Validator.isEmpty(data.subject)) {
    errors.subject = "Subject is required.";
  }

  if (!Validator.isLength(data.subject, { min: 5, max: 100 })) {
    errors.subject = "Subject must be between 5 and 100 characters.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
