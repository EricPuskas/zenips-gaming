const express = require("express");
const passport = require("passport");
const router = express.Router();
const { getTerms, deleteTerms, newTerms } = require("../controllers/terms");

// @route   POST api/terms
// @desc    CREATE OR UPDATE TERMS
// @access  Private
router.post("/", passport.authenticate("jwt", { session: false }), newTerms);

// @route   GET api/terms
// @desc    GET TERMS
// @access  Public
router.get("/", getTerms);

// @route   DELETE api/terms
// @desc    Delete TERMS
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  deleteTerms
);

module.exports = router;
