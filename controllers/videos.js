// Load Database
const db = require("../models");
const validateVideosInput = require("../middleware/validation/videos");
const ObjectId = require("mongoose").Types.ObjectId;

exports.addVideo = async (req, res) => {
  try {
    const { errors, isValid } = validateVideosInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    let videoExists = await db.Video.find({
      title: req.body.title,
      url: req.body.url
    });
    if (videoExists.length > 0) {
      errors.title = "Video already exists.";
      return res.status(400).json(errors);
    }
    const data = new db.Video({
      title: req.body.title,
      url: req.body.url
    });
    let video = await data.save();
    res.json(video);
  } catch (err) {
    console.log(err);
    return res.status(404).json(err);
  }
};

exports.getVideos = async (req, res) => {
  try {
    let videos = await db.Video.find({}).sort({ createdAt: -1 });
    if (!videos) {
      errors.error_message = "No videos were found.";
      return res.status(404).json(errors);
    }
    res.json(videos);
  } catch (err) {
    res.json(err);
  }
};

exports.getLatestVideo = async (req, res) => {
  try {
    let video = await db.Video.find({})
      .sort({ createdAt: -1 })
      .limit(1);
    if (!video) {
      errors.error_message = "No video found.";
      return res.status(404).json(errors);
    }
    res.json(video);
  } catch (err) {
    res.json(err);
  }
};

exports.deleteVideos = async (req, res) => {
  try {
    let videos = req.body.videos;
    videos
      .forEach(async function(id) {
        await db.Video.deleteOne({ _id: ObjectId(id) });
      })
      .then(res => res.json("Deleted"))
      .catch(err => res.json(err));
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};
