const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Export Model to be used in the app.
const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
