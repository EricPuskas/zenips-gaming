// Load Database
const db = require("../models");

const validatePostInput = require("../middleware/validation/posts");

exports.createPatchNote = async (req, res) => {
  try {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    const data = new db.PatchNotes({
      content: req.body.content,
      title: req.body.title,
      avatar: req.user.avatar,
      user: req.user.id,
      name: `${req.user.firstName} ${req.user.lastName}`,
      username: req.user.username
    });
    let patchNote = await data.save();
    res.json(patchNote);
  } catch (err) {
    return res.status(404).json(err);
  }
};

exports.getPatchNotes = async (req, res) => {
  try {
    let perPage = parseInt(req.query.per, 10);
    let pageQuery = parseInt(req.query.page, 10);
    let pageNumber = pageQuery ? pageQuery : 1;
    let count = await db.PatchNotes.countDocuments().exec();
    let patchNotes = await db.PatchNotes.find()
      .sort({ createdAt: -1 })
      .skip(perPage * pageNumber - perPage)
      .limit(perPage)
      .exec();
    let pages = Math.ceil(count / perPage);
    if (perPage === 0 || perPage === undefined || perPage === null) {
      patchNotes = [];
    }
    res.json({ perPage, pageNumber, pageQuery, pages, patchNotes });
  } catch (err) {
    res.status(404).json({ noPosts: "No Patch Notes were found." });
  }
};

exports.deletePatchNote = async (req, res) => {
  try {
    let patchNote = await db.PatchNotes.findByIdAndDelete(req.params.id);
    let dev = req.user.role.includes("Developer");
    if (patchNote.user.toString() !== req.user.id && !dev) {
      return res.status(401).json({ notauthorized: "User not authorized" });
    }
    res.json({ success: true });
  } catch (err) {
    res.status(404).json({
      error_message:
        "Patch Note not found. It might have been deleted already. Reload the page or try again."
    });
  }
};

exports.getPatchNote = async (req, res) => {
  try {
    let patchNote = await db.PatchNotes.findById(req.params.id);
    let dev = req.user.role.includes("Developer");
    if (patchNote.user.toString() !== req.user.id && !dev) {
      return res.status(401).json({ notauthorized: "User not authorized" });
    }
    res.json(patchNote);
  } catch (err) {
    res.status(404).json({
      postnotfound: "That Patch Note does not exist."
    });
  }
};

exports.getUserPatchNotes = async (req, res) => {
  try {
    let username = req.params.username;
    let perPage = parseInt(req.query.per, 10);
    let pageQuery = parseInt(req.query.page, 10);
    let pageNumber = pageQuery ? pageQuery : 1;
    let count = await db.PatchNotes.countDocuments({ username }).exec();
    let patch_notes = await db.PatchNotes.find({ username })
      .sort({ createdAt: -1 })
      .skip(perPage * pageNumber - perPage)
      .limit(perPage)
      .exec();
    let pages = Math.ceil(count / perPage);
    if (perPage === 0 || perPage === undefined || perPage === null) {
      posts = [];
    }
    res.json({ perPage, pageNumber, pageQuery, pages, patch_notes, count });
  } catch (err) {
    res.status(404).json({ noPatchNotes: "No Patch Notes were found." });
  }
};

exports.updatePatchNote = async (req, res) => {
  try {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    const data = {
      content: req.body.content,
      title: req.body.title
    };
    await db.PatchNotes.findByIdAndUpdate(req.params.id, data).exec();
    res.json(data);
  } catch (err) {
    res.status(404).json({
      postnotfound: "That Patch Note does not exist."
    });
  }
};
