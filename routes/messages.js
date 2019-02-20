const express = require("express");
const passport = require("passport");
const router = express.Router();
const {
  sendMessage,
  getMessages,
  deleteMessage,
  deleteMessages,
  updateMessage,
  moveMessages
} = require("../controllers/messages");

// @route   POST api/messages/new
// @desc    CREATE A NEW Message
// @access  Public
router.post("/new", sendMessage);

// @route   GET api/messages
// @desc    GET ALL MESSAGES
// @access  Private
router.get("/", passport.authenticate("jwt", { session: false }), getMessages);

// @route   DELETE api/messages/:id
// @desc    Delete message with ID
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteMessage
);

// @route   DELETE api/messages
// @desc    Delete selected messages
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  deleteMessages
);

// @route   PUT api/messages/move/:location
// @desc    Move selected messages to archive or inbox.
// @access  Private
router.put(
  "/move/:location",
  passport.authenticate("jwt", { session: false }),
  moveMessages
);

// @route   PUT api/messages/:id
// @desc    Update message with ID
// @access  Private
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateMessage
);

module.exports = router;
