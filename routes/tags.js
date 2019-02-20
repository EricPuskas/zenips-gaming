const express = require("express");
const passport = require("passport");
const router = express.Router();
const { createTag, getTags, deleteTags } = require("../controllers/tags");

// @route   POST api/tags/new
// @desc    CREATE A NEW TAG
// @access  Private
router.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  createTag
);

// @route   GET api/tags
// @desc    GET TAGS
// @access  Public
router.get("/", getTags);

// @route   DELETE api/tags
// @desc    Delete selected tags
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  deleteTags
);

module.exports = router;
