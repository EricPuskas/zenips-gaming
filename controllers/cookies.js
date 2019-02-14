const db = require("../models");

exports.getCookies = async (req, res) => {
  try {
    let cookies = await db.Cookie.find().limit(1);
    if (cookies.length === 0) {
      let response = {
        content: ""
      };
      res.status(200).json(response);
    } else {
      res.status(200).json(cookies[0]);
    }
  } catch (err) {
    return res.status(400).json(err);
  }
};

exports.newCookies = async (req, res) => {
  try {
    let cookiesExists = await db.Cookie.find().limit(1);
    if (cookiesExists.length > 0) {
      await db.Cookie.updateOne({}, { content: req.body.content });
      res.status(200).json("Updated");
    } else {
      const data = new db.Cookie({
        content: req.body.content
      });
      let cookies = await data.save();
      res.status(200).json(cookies);
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json(err);
  }
};

exports.deleteCookies = async (req, res) => {
  try {
    await db.Cookie.remove({});
    res.status(200).json("Deleted");
  } catch (err) {
    console.log(err);
    return res.status(404).json(err);
  }
};

module.exports = exports;
