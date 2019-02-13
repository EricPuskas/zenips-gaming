// Use mongoose library to create schema
const mongoose = require("mongoose");

//Create Schema
const videoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  createdAt: { type: Date, default: Date.now }
});

// Export Model to be used in the app.
const Video = mongoose.model("Video", videoSchema);
module.exports = Video;
