const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { SECRET_KEY } = require("../config/keys");

// Load Input Validation
const validateRegisterInput = require("../middleware/validation/register");
const validateLoginInput = require("../middleware/validation/login");

exports.registerUser = async (req, res) => {
  try {
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    let user = await User.findOne({ email: req.body.email });
    // Check if user's email already exists
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        username: req.body.username,
        avatar: req.body.avatar,
        password: req.body.password,
        role: req.body.role
      });

      let salt = await bcrypt.genSalt(10);
      let hash = await bcrypt.hash(newUser.password, salt);
      newUser.password = hash;
      let user = await newUser.save();
      res.json(user);
    }
  } catch (err) {
    res.json(err);
  }
};

exports.loginUser = (req, res) => {
  try {
    const { errors, isValid } = validateLoginInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    User.findOne({ email }).then(user => {
      // Check for user
      if (!user) {
        errors.error_message = "Email or password is incorrect";
        return res.status(404).json(errors);
      }

      // Check Password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User Matched
          const payload = {
            id: user.id,
            avatar: user.avatar,
            name: user.name,
            username: user.username,
            role: user.role
          }; // Create JWT Payload
          // Sign Token                   // Expires in 1 day
          jwt.sign(payload, SECRET_KEY, { expiresIn: 86400 }, (err, token) => {
            res.json({
              success: true,
              token: `Bearer ${token}`
            });
          });
        } else {
          errors.error_message = "Email or password is incorrect";
          return res.status(400).json(errors);
        }
      });
    });
  } catch (err) {
    res.json(err);
  }
};

module.exports = exports;
