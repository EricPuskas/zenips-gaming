const db = require("../models");

exports.getPrivacyPolicy = async (req, res) => {
  try {
    let privacy = await db.Privacy.find().limit(1);
    if (privacy.length === 0) {
      let response = {
        content: ""
      };
      res.status(200).json(response);
    } else {
      res.status(200).json(privacy[0]);
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

exports.newPrivacy = async (req, res) => {
  try {
    let privacyExists = await db.Privacy.find().limit(1);
    if (privacyExists.length > 0) {
      await db.Privacy.updateOne({}, { content: req.body.content });
      res.status(200).json("Updated");
    } else {
      const data = new db.Privacy({
        content: req.body.content
      });
      let privacy = await data.save();
      res.status(200).json(privacy);
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json(err);
  }
};

exports.deletePrivacy = async (req, res) => {
  try {
    await db.Privacy.remove({});
    res.status(200).json("Deleted");
  } catch (err) {
    console.log(err);
    return res.status(404).json(err);
  }
};

module.exports = exports;
