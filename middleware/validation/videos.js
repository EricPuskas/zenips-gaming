const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateVideosInput(data) {
  let errors = {};

  // Use Custom isEmpty function
  data.title = !isEmpty(data.title) ? data.title : "";
  data.url = !isEmpty(data.url) ? data.url : "";

  if (!Validator.isLength(data.title, { min: 10, max: 150 })) {
    errors.title = "The title needs to be between 10 and 150 characters.";
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = "The video must have a title.";
  }

  if (!Validator.isLength(data.url, { min: 11, max: 11 })) {
    errors.url = "Invalid YouTube Video identifier provided.";
  }

  if (Validator.isEmpty(data.url)) {
    errors.url = "The video must have an url / identifier.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
