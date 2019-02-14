const express = require("express");
const passport = require("passport");
const router = express.Router();
const { getTerms, deleteTerms, newTerms } = require("../controllers/terms");

// @route   POST api/terms
// @desc    CREATE A NEW ABOUT PAGE
// @access  Private
router.post("/", passport.authenticate("jwt", { session: false }), newTerms);

// @route   GET api/terms
// @desc    GET ABOUT INFO
// @access  Public
router.get("/", getTerms);

// @route   DELETE api/terms
// @desc    Delete selected tags
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  deleteTerms
);

module.exports = router;
