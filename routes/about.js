const express = require("express");
const passport = require("passport");
const router = express.Router();
const { getAbout, deleteAbout, newAbout } = require("../controllers/about");

// @route   POST api/about
// @desc    CREATE OR UPDATE ABOUT PAGE
// @access  Private
router.post("/", passport.authenticate("jwt", { session: false }), newAbout);

// @route   GET api/about
// @desc    GET ABOUT
// @access  Public
router.get("/", getAbout);

// @route   DELETE api/about
// @desc    Delete ABOUT
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  deleteAbout
);

module.exports = router;
