// Use mongoose library to create schema
const mongoose = require("mongoose");

//Create Schema
const privacySchema = mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  createdAt: { type: Date, default: Date.now }
});

// Export Model to be used in the app.
const Privacy = mongoose.model("Privacy", privacySchema);
module.exports = Privacy;
