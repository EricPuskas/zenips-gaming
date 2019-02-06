const express = require("express");
const passport = require("passport");
const router = express.Router();
const {
  getUser,
  getUserByUsername,
  getUsers,
  updateUser,
  updateUserAvatar,
  deleteUser,
  sendResetPassword,
  sendForgotPassword,
  checkTokenValidity,
  updateUserPassword
} = require("../controllers/user");

// @route   GET api/users/
// @desc    Retrieve all users
// @access  Private
router.get("/", passport.authenticate("jwt", { session: false }), getUsers);

// @route   GET api/users/:id
// @desc    Retrieve User Info
// @access  Private
router.get("/:id", passport.authenticate("jwt", { session: false }), getUser);

// @route   PUT api/users/:id
// @desc    Update a user's information.
// @access  Private
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateUser
);

// @route   PUT api/users/:id/avatar
// @desc    Update a user's avatar
// @access  Private
router.put(
  "/:id/avatar",
  passport.authenticate("jwt", { session: false }),
  updateUserAvatar
);

// @route   GET api/users/handle/:username
// @desc    Retrieve User Info by username
// @access  Private
router.get(
  "/handle/:username",
  passport.authenticate("jwt", { session: false }),
  getUserByUsername
);

// @route   DELETE api/users/:id
// @desc   Delete a user
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteUser
);

// @route   POST api/users/reset
// @desc    Send reset password email
// @access  Public
router.post("/reset", sendResetPassword);

// @route   POST api/users/forgot
// @desc    Send forgot password email
// @access  Public
router.post("/forgot", sendForgotPassword);

// @route   PUT api/users/changepw/:id
// @desc    Update Password
// @access  Public
router.put("/changepw/:id", updateUserPassword);

// @route   POST api/users/reset
// @desc    Send reset password email
// @access  Public
router.get("/reset/:token", checkTokenValidity);

module.exports = router;
