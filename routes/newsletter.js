const express = require("express");
const router = express.Router();
const { addSubscriber } = require("../controllers/newsletter");

// @route   POST api/newsletter
// @desc    SEND EMAIL TO MAILCHIMP.
// @access  Private
router.post("/", addSubscriber);

module.exports = router;
