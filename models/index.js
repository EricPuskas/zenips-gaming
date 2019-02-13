const mongoose = require("mongoose");
const { MONGO_URI } = require("../config/keys");

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB is connected."))
  .catch(err => console.log(err));

mongoose.set("debug", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.Promise = Promise;

module.exports.User = require("./user");
module.exports.Post = require("./post");
module.exports.PatchNotes = require("./patch_notes");
module.exports.Article = require("./article");
module.exports.Tag = require("./tag");
module.exports.Message = require("./message");
module.exports.Video = require("./video");
