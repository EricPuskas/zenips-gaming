// Use mongoose library to create schema
const mongoose = require("mongoose");

//Create Schema
const cookieSchema = mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  createdAt: { type: Date, default: Date.now }
});

// Export Model to be used in the app.
const Cookie = mongoose.model("Cookie", cookieSchema);
module.exports = Cookie;
