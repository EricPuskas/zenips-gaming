const express = require("express");
const passport = require("passport");
const router = express.Router();
const {
  getPrivacyPolicy,
  deletePrivacy,
  newPrivacy
} = require("../controllers/privacy");

// @route   POST api/privacy
// @desc    CREATE NEW PRIVACY POLICY OR UPDATE EXISTING.
// @access  Private
router.post("/", passport.authenticate("jwt", { session: false }), newPrivacy);

// @route   GET api/privacy
// @desc    GET PRIVACY POLICY
// @access  Public
router.get("/", getPrivacyPolicy);

// @route   DELETE api/privacy
// @desc    Delete PRIVACY
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  deletePrivacy
);

module.exports = router;
