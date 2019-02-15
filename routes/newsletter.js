const express = require("express");
const router = express.Router();
const { addSubscriber } = require("../controllers/newsletter");

// @route   POST api/newsletter
// @desc    CREATE A NEW TAG
// @access  Private
router.post("/", addSubscriber);

module.exports = router;
