const express = require("express");
const passport = require("passport");
const router = express.Router();
const {
  addVideo,
  getVideos,
  deleteVideos,
  getLatestVideo
} = require("../controllers/videos");

// @route   POST api/videos/new
// @desc    ADD A NEW VIDEO
// @access  Private
router.post("/new", passport.authenticate("jwt", { session: false }), addVideo);

// @route   GET api/videos
// @desc    GET ALL VIDOES
// @access  Public
router.get("/", getVideos);

// @route   GET api/videos/latest
// @desc    GET latest video
// @access  Public
router.get("/latest", getLatestVideo);

// @route   DELETE api/videos
// @desc    Delete selected videos
// @access  Private
router.delete("/", deleteVideos);

module.exports = router;
