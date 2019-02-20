const express = require("express");
const passport = require("passport");
const router = express.Router();
const {
  getCookies,
  deleteCookies,
  newCookies
} = require("../controllers/cookies");

// @route   POST api/cookies
// @desc    CREATE OR UPDATE COOKIES
// @access  Private
router.post("/", passport.authenticate("jwt", { session: false }), newCookies);

// @route   GET api/cookies
// @desc    GET COOKIES
// @access  Public
router.get("/", getCookies);

// @route   DELETE api/cookies
// @desc    Delete COOKIES
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  deleteCookies
);

module.exports = router;
