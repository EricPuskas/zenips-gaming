const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateArticleInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.content = !isEmpty(data.content) ? data.content : "";
  data.preview = !isEmpty(data.preview) ? data.preview : "";
  data.tag = !isEmpty(data.tag) ? data.tag : "";

  if (!Validator.isLength(data.title, { min: 15, max: 100 })) {
    errors.title = "Title must be between 15 and 150 characters";
  }

  if (!Validator.isLength(data.preview, { min: 50, max: 300 })) {
    errors.preview = "Preview must be between 50 and 300 characters";
  }

  if (!Validator.isLength(data.content, { min: 150 })) {
    errors.content = "Content must have at least 150 characters.";
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required.";
  }

  if (Validator.isEmpty(data.tag) || data.tag === "Choose a tag") {
    errors.tag = "Please choose a tag.";
  }

  if (Validator.isEmpty(data.preview)) {
    errors.preview = "Preview field is required.";
  }

  if (Validator.isEmpty(data.content)) {
    errors.content = "Content is required.";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
