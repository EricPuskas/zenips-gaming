// Load Database
const db = require("../models");
const rp = require("request-promise");
const validateMessagesInput = require("../middleware/validation/messages");
const isEmpty = require("../middleware/validation/isEmpty");
const ObjectId = require("mongoose").Types.ObjectId;
//REGEX FOR SEARCH FUNCTION
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

exports.sendMessage = async (req, res) => {
  try {
    const { errors, isValid } = validateMessagesInput(req.body);
    let token = req.body.token;
    let remoteip = req.connection.remoteAddress;
    const secretKey = process.env.GOOGLE_RECAPTCHA_SECRET_KEY;
    const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}&remoteip=${remoteip}`;
    console.log(verificationURL);

    var options = {
      method: "POST",
      uri: verificationURL,
      json: true // Automatically stringifies the body to JSON
    };

    rp(options)
      .then(function(body) {
        if (body.success !== undefined && !body.success) {
          console.log("Supposed to send json back...");
          errors.error_message = "Failed captcha verification";
          return res.status(400).json(errors);
        }
        // Check Validation
        if (!isValid || !isEmpty(errors)) {
          // Return any errors with 400 status
          return res.status(400).json(errors);
        }

        const data = new db.Message({
          subject: req.body.subject,
          content: req.body.content,
          sender: {
            name: req.body.name,
            email: req.body.email
          }
        });

        let message = data.save();
        res.json(message);
      })
      .catch(function(err) {
        console.log(err);
        return res.status(400).json(err);
      });
  } catch (err) {
    console.log(err);
    return res.status(404).json(err);
  }
};

exports.getMessage = async (req, res) => {
  try {
    const errors = {};
    let message = await db.Message.findById(req.params.id);
    if (!message) {
      errors.message = "No message was found.";
      return res.status(404).json(errors);
    }
    res.json(message);
  } catch (err) {
    res.json(err);
  }
};

exports.getMessages = async (req, res) => {
  try {
    let perPage = parseInt(req.query.per, 10);
    let pageQuery = parseInt(req.query.page, 10);
    let pageNumber = pageQuery ? pageQuery : 1;
    let count, pages, messages;
    let inbox = await db.Message.countDocuments({ location: "inbox" });
    let archive = await db.Message.countDocuments({ location: "archive" });

    if (req.query.search) {
      const regex = new RegExp(escapeRegex(req.query.search), "gi");
      messages = await db.Message.find({})
        .or([
          { location: { $regex: regex } },
          { "sender.name": { $regex: regex } },
          { "sender.email": { $regex: regex } },
          { subject: { $regex: regex } }
        ])
        .sort({ createdAt: -1 })
        .skip(perPage * pageNumber - perPage)
        .limit(perPage)
        .exec();
      let count_docs = await db.Message.find({})
        .or([
          { location: { $regex: regex } },
          { "sender.name": { $regex: regex } },
          { "sender.email": { $regex: regex } },
          { subject: { $regex: regex } }
        ])
        .sort({ createdAt: -1 })
        .skip(perPage * pageNumber - perPage)
        .exec();
      count = count_docs.length;
    } else {
      messages = await db.Message.find()
        .sort({ createdAt: -1 })
        .skip(perPage * pageNumber - perPage)
        .limit(perPage)
        .exec();
      count = await db.Message.countDocuments().exec();
    }
    pages = Math.ceil(count / perPage);
    if (perPage === 0 || perPage === undefined || perPage === null) {
      messages = [];
    }
    res.json({
      count,
      inbox,
      archive,
      perPage,
      pageNumber,
      pageQuery,
      pages,
      messages
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({ noMessages: "No Messages found." });
  }
};

exports.updateMessage = async (req, res) => {
  try {
    const data = {
      isRead: req.body.isRead,
      location: req.body.location
    };
    await db.Message.findByIdAndUpdate(req.params.id, data).exec();
    let message = await db.Message.findById(req.params.id).exec();
    res.json(message);
  } catch (err) {
    res.status(404).json({
      message: "That message does not exist."
    });
  }
};

exports.moveMessages = async (req, res) => {
  try {
    let location = req.params.location;
    let messages = req.body.messages;
    let update = { location };
    messages.forEach(async function(message) {
      await db.Message.findByIdAndUpdate(message, update);
    });

    res.json("Moved to Archive.");
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

exports.deleteMessages = async (req, res) => {
  try {
    let messages = req.body.messages;
    messages.forEach(async function(id) {
      await db.Message.deleteOne({ _id: ObjectId(id) });
    });
    res.json("Deleted");
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    let dev = req.user.role.includes("Developer");
    if (!dev) {
      return res.status(401).json({ notauthorized: "User not authorized" });
    }
    await db.Message.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(404).json({
      messagenotfound:
        "Message not found. It might have been deleted already. Reload the page or try again."
    });
  }
};
