const db = require("../models");

exports.getTerms = async (req, res) => {
  try {
    let terms = await db.Term.find().limit(1);
    if (terms.length === 0) {
      let response = {
        content: ""
      };
      res.status(200).json(response);
    } else {
      res.status(200).json(terms[0]);
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

exports.newTerms = async (req, res) => {
  try {
    let termsExists = await db.Term.find().limit(1);
    if (termsExists.length > 0) {
      await db.Term.updateOne({}, { content: req.body.content });
      res.status(200).json("Updated");
    } else {
      const data = new db.Term({
        content: req.body.content
      });
      let terms = await data.save();
      res.status(200).json(terms);
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json(err);
  }
};

exports.deleteTerms = async (req, res) => {
  try {
    await db.Term.remove({});
    res.status(200).json("Deleted");
  } catch (err) {
    console.log(err);
    return res.status(404).json(err);
  }
};

module.exports = exports;
