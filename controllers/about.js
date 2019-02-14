const db = require("../models");

exports.getAbout = async (req, res) => {
  try {
    let about = await db.About.find().limit(1);
    if (about.length === 0) {
      let response = {
        content: ""
      };
      res.status(200).json(response);
    } else {
      res.status(200).json(about[0]);
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

exports.newAbout = async (req, res) => {
  try {
    let aboutExists = await db.About.find().limit(1);
    if (aboutExists.length > 0) {
      await db.About.updateOne({}, { content: req.body.content });
      res.status(200).json("Updated");
    } else {
      const data = new db.About({
        content: req.body.content
      });
      let about = await data.save();
      res.status(200).json(about);
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json(err);
  }
};

exports.deleteAbout = async (req, res) => {
  try {
    await db.About.remove({});
    res.status(200).json("Deleted");
  } catch (err) {
    console.log(err);
    return res.status(404).json(err);
  }
};

module.exports = exports;
