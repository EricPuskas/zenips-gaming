// Use mongoose library to create schema
const mongoose = require("mongoose");

//Create Schema
const tagSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: { type: Date, default: Date.now }
});

// Export Model to be used in the app.
const Tag = mongoose.model("Tag", tagSchema);
module.exports = Tag;
