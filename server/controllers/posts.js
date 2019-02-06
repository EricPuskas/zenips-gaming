// Load Database
const db = require("../models");

const validatePostInput = require("../middleware/validation/posts");

exports.createPost = async (req, res) => {
  try {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    const newPost = new db.Post({
      content: req.body.content,
      title: req.body.title,
      avatar: req.user.avatar,
      user: req.user.id,
      name: `${req.user.firstName} ${req.user.lastName}`,
      username: req.user.username
    });
    let post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.log(err);
    return res.status(404).json(err);
  }
};

exports.getPosts = async (req, res) => {
  try {
    let perPage = parseInt(req.query.per, 10);
    let pageQuery = parseInt(req.query.page, 10);
    let pageNumber = pageQuery ? pageQuery : 1;
    let count = await db.Post.countDocuments().exec();
    let posts = await db.Post.find()
      .sort({ createdAt: -1 })
      .skip(perPage * pageNumber - perPage)
      .limit(perPage)
      .exec();
    let pages = Math.ceil(count / perPage);
    if (perPage === 0 || perPage === undefined || perPage === null) {
      posts = [];
    }
    res.json({ perPage, pageNumber, pageQuery, pages, posts });
  } catch (err) {
    res.status(404).json({ noPosts: "No Posts were found." });
  }
};

exports.getUserPosts = async (req, res) => {
  try {
    let username = req.params.username;
    let perPage = parseInt(req.query.per, 10);
    let pageQuery = parseInt(req.query.page, 10);
    let pageNumber = pageQuery ? pageQuery : 1;
    let count = await db.Post.countDocuments({ username }).exec();
    let posts = await db.Post.find({ username })
      .sort({ createdAt: -1 })
      .skip(perPage * pageNumber - perPage)
      .limit(perPage)
      .exec();
    let pages = Math.ceil(count / perPage);
    if (perPage === 0 || perPage === undefined || perPage === null) {
      posts = [];
    }
    res.json({ perPage, pageNumber, pageQuery, pages, posts, count });
  } catch (err) {
    res.status(404).json({ noPosts: "No Posts were found." });
  }
};

exports.deletePost = async (req, res) => {
  try {
    let post = await db.Post.findByIdAndDelete(req.params.id);
    let dev = req.user.role.includes("Developer");
    if (post.user.toString() !== req.user.id && !dev) {
      return res.status(401).json({ notauthorized: "User not authorized" });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(404).json({
      postnotfound:
        "Post not found. It might have been deleted already. Reload the page or try again."
    });
  }
};

exports.getPost = async (req, res) => {
  try {
    let post = await db.Post.findById(req.params.id);
    let dev = req.user.role.includes("Developer");
    if (post.user.toString() !== req.user.id && !dev) {
      return res.status(401).json({ notauthorized: "User not authorized" });
    }
    res.json(post);
  } catch (err) {
    res.status(404).json({
      postnotfound: "That post does not exist."
    });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    const postData = {
      content: req.body.content,
      title: req.body.title
    };
    await db.Post.findByIdAndUpdate(req.params.id, postData).exec();
    res.json(postData);
  } catch (err) {
    res.status(404).json({
      postnotfound: "That post does not exist."
    });
  }
};
