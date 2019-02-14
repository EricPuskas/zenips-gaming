// Use mongoose library to create schema
const mongoose = require("mongoose");

//Create Schema
const termSchema = mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  createdAt: { type: Date, default: Date.now }
});

// Export Model to be used in the app.
const Term = mongoose.model("Term", termSchema);
module.exports = Term;
