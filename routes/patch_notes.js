const express = require("express");
const passport = require("passport");
const router = express.Router();
const {
  createPatchNote,
  getPatchNotes,
  deletePatchNote,
  getPatchNote,
  updatePatchNote,
  getUserPatchNotes
} = require("../controllers/patch_notes");

// @route   POST api/patchnotes
// @desc    CREATE A PATCH NOTE
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createPatchNote
);

// @route   GET api/patchnotes
// @desc    GET ALL PATCH NOTES
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getPatchNotes
);

// @route   DELETE api/patchnotes/:id
// @desc    Delete a patch note with a specific ID
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deletePatchNote
);

// @route   GET api/patchnotes/:id
// @desc    Get a patch note with a specific ID
// @access  Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  getPatchNote
);

// @route   GET api/patchnotes/user/:username
// @desc    GET ALL patch notes for a specific user
// @access  Private
router.get(
  "/user/:username",
  passport.authenticate("jwt", { session: false }),
  getUserPatchNotes
);

// @route   PUT api/patchnotes/:id
// @desc    Update a patch note with a specific ID
// @access  Private
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updatePatchNote
);

module.exports = router;
