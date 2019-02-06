// Use mongoose library to create schema
const mongoose = require("mongoose");

// Schema
const messageSchema = mongoose.Schema({
  subject: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  sender: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
  location: {
    type: String,
    default: "inbox"
  },
  isRead: {
    type: Boolean,
    default: false
  },
  createdAt: { type: Date, default: Date.now }
});

// Export Model to be used in the app.
const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
