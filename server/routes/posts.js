const express = require("express");
const passport = require("passport");
const router = express.Router();
const {
  createPost,
  getPosts,
  getUserPosts,
  deletePost,
  getPost,
  updatePost
} = require("../controllers/posts");

// @route   POST api/posts
// @desc    CREATE A POST
// @access  Private
router.post("/", passport.authenticate("jwt", { session: false }), createPost);

// @route   GET api/posts
// @desc    GET ALL POSTS
// @access  Private
router.get("/", passport.authenticate("jwt", { session: false }), getPosts);

// @route   DELETE api/posts/:id
// @desc    Delete a post with a specific ID
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deletePost
);

// @route   GET api/posts/:id
// @desc    Get a post with a specific ID
// @access  Private
router.get("/:id", passport.authenticate("jwt", { session: false }), getPost);

// @route   GET api/posts/user/:username
// @desc    GET ALL POSTS for a specific user
// @access  Private
router.get(
  "/user/:username",
  passport.authenticate("jwt", { session: false }),
  getUserPosts
);

// @route   PUT api/posts/:id
// @desc    Update a post with a specific ID
// @access  Private
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updatePost
);

module.exports = router;
