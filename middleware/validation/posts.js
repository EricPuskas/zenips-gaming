const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validatePostInput(data) {
  let errors = {};

  // Use Custom isEmpty function
  data.title = !isEmpty(data.title) ? data.title : "";
  data.content = !isEmpty(data.content) ? data.content : "";

  if (!Validator.isLength(data.title, { min: 10, max: 150 })) {
    errors.title = "Title must be between 10 and 150 characters";
  }

  if (!Validator.isLength(data.content, { min: 150 })) {
    errors.content = "Content must have at least 150 characters.";
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required.";
  }

  if (Validator.isEmpty(data.content)) {
    errors.content = "Content is required.";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
