const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ArticleSchema = new Schema({
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      Ref: "User"
    },
    name: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      required: true
    }
  },
  title: {
    type: String,
    required: true
  },
  preview: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "Private"
  },
  thumbnail: {
    type: String,
    required: true
  },
  thumbnailSource: {
    type: String,
    default: "zenipsgaming"
  },
  thumbnailAuthor: {
    type: String,
    default: "zenipsgaming"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Export Model to be used in the app.
const Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;
