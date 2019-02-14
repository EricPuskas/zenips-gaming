const express = require("express");
const passport = require("passport");
const router = express.Router();
const { getAbout, deleteAbout, newAbout } = require("../controllers/about");

// @route   POST api/about
// @desc    CREATE A NEW ABOUT PAGE
// @access  Private
router.post("/", passport.authenticate("jwt", { session: false }), newAbout);

// @route   GET api/about
// @desc    GET ABOUT INFO
// @access  Public
router.get("/", getAbout);

// @route   DELETE api/tags
// @desc    Delete selected tags
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  deleteAbout
);

module.exports = router;
