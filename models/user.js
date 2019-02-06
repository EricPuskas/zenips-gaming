const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const defaultAvatar =
  "https://www.ischool.berkeley.edu/sites/default/files/default_images/avatar.jpeg";

// Create Schema
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "Staff"
  },
  bio: {
    type: String,
    default: "This user does not have a bio."
  },
  description: {
    type: String,
    default: "No description found."
  },
  avatar: {
    type: String,
    default: defaultAvatar
  },
  social: {
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    instagram: {
      type: String
    },
    linkedin: {
      type: String
    }
  },
  joined: {
    type: Date,
    default: Date.now
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

// Export Model to be used in the app.
const User = mongoose.model("User", UserSchema);
module.exports = User;
