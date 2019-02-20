const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateTagsInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.tags = "The tag's name needs to be between 2 and 30 characters.";
  }

  if (Validator.isEmpty(data.name)) {
    errors.tags = "The tag must have a name.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
