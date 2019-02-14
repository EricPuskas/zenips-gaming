// Use mongoose library to create schema
const mongoose = require("mongoose");

//Create Schema
const aboutSchema = mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  createdAt: { type: Date, default: Date.now }
});

// Export Model to be used in the app.
const About = mongoose.model("About", aboutSchema);
module.exports = About;
