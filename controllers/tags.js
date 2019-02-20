// Load Database
const db = require("../models");
const validateTagsInput = require("../middleware/validation/tags");
const ObjectId = require("mongoose").Types.ObjectId;

exports.createTag = async (req, res) => {
  try {
    const { errors, isValid } = validateTagsInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    let tagExists = await db.Tag.find({ name: req.body.name });
    if (tagExists.length > 0) {
      errors.tags = "Tag already exists.";
      return res.status(400).json(errors);
    }
    const data = new db.Tag({
      name: req.body.name
    });
    let tag = await data.save();
    res.json(tag);
  } catch (err) {
    console.log(err);
    return res.status(404).json(err);
  }
};

exports.getTags = async (req, res) => {
  try {
    let tags = await db.Tag.find({}).sort({ name: 1 });
    if (!tags) {
      let errors = {};
      errors.error_message = "No tags were found.";
      return res.status(404).json(errors);
    }
    res.json(tags);
  } catch (err) {
    res.json(err);
  }
};

exports.deleteTags = async (req, res) => {
  try {
    let tags = req.body.tags;
    console.log(tags);
    tags
      .forEach(async function(id) {
        await db.Tag.deleteOne({ _id: ObjectId(id) });
      })
      .then(res => res.json("Deleted"))
      .catch(err => res.json(err));
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};
