// Load Database
const db = require("../models");
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});
const validateArticleInput = require("../middleware/validation/articles");

//REGEX FOR SEARCH FUNCTION
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

exports.createArticle = async (req, res) => {
  try {
    const { errors, isValid } = validateArticleInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    let thumbnail;
    if (req.body.thumbnail_file) {
      let result = await cloudinary.v2.uploader.upload(req.body.thumbnail, {
        secure: true,
        width: 832,
        height: 468,
        crop: "limit",
        quality: "auto",
        fetch_format: "auto"
      });
      thumbnail = result.secure_url;
    } else {
      thumbnail = req.body.thumbnail;
    }

    const data = new db.Article({
      author: {
        id: req.user.id,
        name: `${req.user.firstName} ${req.user.lastName}`,
        username: req.user.username,
        avatar: req.user.avatar
      },
      title: req.body.title,
      preview: req.body.preview,
      tag: req.body.tag,
      content: req.body.content,
      status: req.body.status,
      thumbnail,
      thumbnailSource: req.body.thumbnail_source,
      thumbnailAuthor: req.body.thumbnail_author
    });

    let article = await data.save();
    res.json(article);
  } catch (err) {
    console.log(err);
    return res.status(404).json(err);
  }
};

exports.updateArticle = async (req, res) => {
  try {
    const { errors, isValid } = validateArticleInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    let thumbnail;
    if (req.body.thumbnail_file) {
      let result = await cloudinary.v2.uploader.upload(req.body.thumbnail, {
        secure: true,
        width: 832,
        height: 468,
        crop: "limit",
        quality: "auto",
        fetch_format: "auto"
      });
      thumbnail = result.secure_url;
    } else {
      thumbnail = req.body.thumbnail;
    }

    const data = {
      author: {
        id: req.user.id,
        name: `${req.user.firstName} ${req.user.lastName}`,
        username: req.user.username,
        avatar: req.user.avatar
      },
      title: req.body.title,
      preview: req.body.preview,
      tag: req.body.tag,
      content: req.body.content,
      status: req.body.status,
      thumbnail,
      thumbnailSource: req.body.thumbnail_source,
      thumbnailAuthor: req.body.thumbnail_author
    };

    await db.Article.findByIdAndUpdate(req.params.id, data).exec();
    res.json(data);
  } catch (err) {
    res.status(404).json({
      articlenotfound: "That article does not exist."
    });
  }
};

exports.getInitArticles = async (req, res) => {
  try {
    let perPage = parseInt(req.query.per, 10);
    let pageQuery = parseInt(req.query.page, 10);
    let pageNumber = pageQuery ? pageQuery : 1;
    let count, pages, articles;
    if (req.query.search) {
      const regex = new RegExp(escapeRegex(req.query.search), "gi");
      articles = await db.Article.find({})
        .or([
          { title: { $regex: regex } },
          { preview: { $regex: regex } },
          { "author.name": { $regex: regex } },
          { tag: { $regex: regex } },
          { status: { $regex: regex } }
        ])
        .sort({ createdAt: -1 })
        .skip(perPage * pageNumber - perPage)
        .limit(perPage)
        .exec();
      let count_docs = await db.Article.find({})
        .or([
          { title: { $regex: regex } },
          { preview: { $regex: regex } },
          { "author.name": { $regex: regex } },
          { tag: { $regex: regex } },
          { status: { $regex: regex } }
        ])
        .sort({ createdAt: -1 })
        .skip(perPage * pageNumber - perPage)
        .exec();
      count = count_docs.length;
    } else {
      articles = await db.Article.find()
        .sort({ createdAt: -1 })
        .skip(perPage * pageNumber - perPage)
        .limit(perPage)
        .exec();
      count = await db.Article.countDocuments().exec();
    }
    pages = Math.ceil(count / perPage);
    if (perPage === 0 || perPage === undefined || perPage === null) {
      articles = [];
    }
    res.json({ count, perPage, pageNumber, pageQuery, pages, articles });
  } catch (err) {
    res.status(404).json({ noArticles: "No Articles were found." });
  }
};

exports.getUserArticles = async (req, res) => {
  try {
    let username = req.params.username;
    let perPage = parseInt(req.query.per, 10);
    let pageQuery = parseInt(req.query.page, 10);
    let pageNumber = pageQuery ? pageQuery : 1;
    let count = await db.Article.countDocuments({
      "author.username": username
    }).exec();
    let articles = await db.Article.find({ "author.username": username })
      .sort({ createdAt: -1 })
      .skip(perPage * pageNumber - perPage)
      .limit(perPage)
      .exec();
    let pages = Math.ceil(count / perPage);
    if (perPage === 0 || perPage === undefined || perPage === null) {
      articles = [];
    }
    res.json({ perPage, pageNumber, pageQuery, pages, articles, count });
  } catch (err) {
    res.status(404).json({ noArticles: "No Articles were found." });
  }
};

exports.getArticle = async (req, res) => {
  try {
    let article = await db.Article.findById(req.params.id);
    res.json(article);
  } catch (err) {
    res.status(404).json({
      notFound: "That article does not exist."
    });
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    let article = await db.Article.findByIdAndDelete(req.params.id);
    let dev = req.user.role.includes("Developer");
    if (article.author.id.toString() !== req.user.id && !dev) {
      return res.status(401).json({ notauthorized: "User not authorized" });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(404).json({
      articlenotfound:
        "Article not found. It might have been deleted already. Reload the page or try again."
    });
  }
};
