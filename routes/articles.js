const express = require("express");
const passport = require("passport");
const router = express.Router();
const {
  createArticle,
  getInitArticles,
  getArticle,
  updateArticle,
  getUserArticles,
  deleteArticle
} = require("../controllers/articles");

// @route   POST api/articles/new
// @desc    CREATE A NEW ARTICLE
// @access  Private
router.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  createArticle
);

// @route   GET api/articles
// @desc    GET ALL ARTICLES
// @access  Public
router.get("/", getInitArticles);

// @route   GET api/articles/:id
// @desc    Get an article with a specific ID
// @access  Public
router.get("/:id", getArticle);

// @route   PUT api/posts/:id
// @desc    Update a post with a specific ID
// @access  Private
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateArticle
);

// @route   PUT api/posts/:id
// @desc    Update a post with a specific ID
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteArticle
);

// @route   GET api/articles/user/:username
// @desc    GET ALL articles for a specific user
// @access  Public
router.get("/user/:username", getUserArticles);

module.exports = router;
