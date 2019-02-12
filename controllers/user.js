// Load Database
const db = require("../models");
const async = require("async");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const validateProfileInput = require("../middleware/validation/profile");
const validateEmailInput = require("../middleware/validation/email");
const validatePasswordInput = require("../middleware/validation/password");
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

exports.getUser = async (req, res) => {
  try {
    const errors = {};
    let user = await db.User.findOne({ _id: req.params.id }, "-password");
    if (!user) {
      errors.noUser = "That user does not exist.";
      return res.status(404).json(errors);
    }
    res.json(user);
  } catch (err) {
    res.json(err);
  }
};

exports.getUsers = async (req, res) => {
  try {
    let users = await db.User.find({}, "-password").sort({ joined: -1 });
    if (!users) {
      errors.error_message = "No users were found.";
      return res.status(404).json(errors);
    }
    res.json(users);
  } catch (err) {
    res.json(err);
  }
};

exports.getUserByUsername = async (req, res) => {
  try {
    const errors = {};
    let user = await db.User.findOne(
      { username: req.params.username },
      "-password"
    );
    if (!user) {
      errors.noUser = "That user does not exist.";
      return res.status(404).json(errors);
    }
    res.json(user);
  } catch (err) {
    res.json(err);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    const data = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      role: req.body.role,
      bio: req.body.bio,
      description: req.body.description,
      social: {
        facebook: req.body.facebook,
        twitter: req.body.twitter,
        linkedin: req.body.linkedin,
        instagram: req.body.instagram
      }
    };
    let user = await db.User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: data },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.json(err);
  }
};

exports.updateUserAvatar = async (req, res) => {
  try {
    const values = Object.values(req.files);
    let image = values[0].path;
    let result = await cloudinary.v2.uploader.upload(image, {
      width: 200,
      height: 200,
      crop: "scale",
      quality: "auto"
    });
    let avatar = result.secure_url;
    const data = { avatar };
    let user = await db.User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: data },
      { new: true }
    );
    await db.Post.updateMany(
      { user: req.params.id },
      { $set: { avatar } },
      { multi: true }
    ).exec();
    await db.PatchNotes.updateMany(
      { user: req.params.id },
      { $set: { avatar } },
      { multi: true }
    ).exec();
    await db.Article.updateMany(
      { "author.id": req.params.id },
      { $set: { "author.avatar": avatar } },
      { multi: true }
    ).exec();
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    let user = await db.User.findById(req.params.id);
    let dev = req.user.role.includes("Developer");
    if (user._id.toString() !== req.user.id && !dev) {
      return res.status(401).json({ notauthorized: "User not authorized" });
    }
    // Delete
    await user.remove();
    res.json({ success: true });
  } catch (err) {
    res.status(404).json({
      postnotfound:
        "Post not found. It might have been deleted already. Reload the page or try again."
    });
  }
};

exports.sendResetPassword = function(req, res) {
  const { errors, isValid } = validateEmailInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }
  async.waterfall(
    [
      function(done) {
        crypto.randomBytes(20, function(err, buf) {
          var token = buf.toString("hex");
          done(err, token);
        });
      },
      function(token, done) {
        db.User.findOne({ email: req.body.email }, function(err, user) {
          if (!user) {
            errors.email = "No account with that email address exists.";
            return res.status(404).json(errors);
          }

          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
          user.save(function(err) {
            done(err, token, user);
          });
        });
      },
      function(token, user, done) {
        var smtpTransport = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PW
          }
        });
        var mailOptions = {
          to: user.email,
          from: process.env.GMAIL_USER,
          subject: "Password Reset",
          text:
            "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
            "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
            "https://zenipsgaming.herokuapp.com/dashboard/team/reset/" +
            token +
            "\n\n" +
            "If you did not request this, please ignore this email and your password will remain unchanged.\n"
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          done(err, "done");
          return res.json(
            `An e-mail has been sent to ${
              user.email
            } with further instructions.`
          );
        });
      }
    ],
    function(err) {
      if (err) return res.status(400).json({ err });
    }
  );
};

exports.checkTokenValidity = async function(req, res, next) {
  try {
    await db.User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() }
    }).then(user => {
      if (user === null) {
        res.json({
          message: "Password reset link is invalid or has expired."
        });
      } else {
        res.status(200).send({
          id: user._id,
          username: user.username,
          message: "Token is valid."
        });
      }
    });
  } catch (err) {
    if (err)
      return res.status(400).send({
        message: "Password reset link is invalid or has expired."
      });
  }
};

exports.sendForgotPassword = function(req, res) {
  const { errors, isValid } = validateEmailInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }
  async.waterfall(
    [
      function(done) {
        crypto.randomBytes(20, function(err, buf) {
          var token = buf.toString("hex");
          done(err, token);
        });
      },
      function(token, done) {
        db.User.findOne({ email: req.body.email }, function(err, user) {
          if (!user) {
            errors.email = "No account with that email address exists.";
            return res.status(404).json(errors);
          }

          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
          user.save(function(err) {
            done(err, token, user);
          });
        });
      },
      function(token, user, done) {
        var smtpTransport = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PW
          }
        });
        var mailOptions = {
          to: user.email,
          from: process.env.GMAIL_USER,
          subject: "Password Reset",
          text:
            "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
            "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
            "https://zenipsgaming.herokuapp.com/auth/reset/" +
            token +
            "\n\n" +
            "If you did not request this, please ignore this email and your password will remain unchanged.\n"
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          done(err, "done");
          return res.json(
            `An e-mail has been sent to ${
              user.email
            } with further instructions.`
          );
        });
      }
    ],
    function(err) {
      if (err) return res.status(400).json({ err });
    }
  );
};

exports.updateUserPassword = async (req, res) => {
  try {
    const { errors, isValid } = validatePasswordInput(req.body);
    let tokenIsValid = await db.User.findOne({
      resetPasswordToken: req.body.token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!tokenIsValid) {
      return res.status(400).json("Token not found.");
    }
    // Check Validations
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(req.body.password, salt);
    let password = hash;
    const data = {
      password,
      resetPasswordToken: null,
      resetPasswordExpires: null
    };
    let user = await db.User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: data },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(404).json(err);
  }
};
