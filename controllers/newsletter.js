// Load Database
const request = require("request-promise");
const validateEmailInput = require("../middleware/validation/email");
const isEmpty = require("../middleware/validation/isEmpty");

function checkToken(token, remoteip) {
  const secretKey = process.env.GOOGLE_RECAPTCHA_SECRET_KEY;
  const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}&remoteip=${remoteip}`;
  let options = {
    method: "POST",
    uri: verificationURL,
    json: true // Automatically stringifies the body to JSON
  };

  return new Promise(function(resolve, reject) {
    request.get(options, function(err, resp, body) {
      if (err) {
        reject(err);
      } else {
        if (body.success !== undefined && !body.success) {
          resolve("Failed captcha verification");
        } else {
          resolve("OK");
        }
      }
    });
  });
}
exports.addSubscriber = async (req, res) => {
  try {
    const { errors, isValid } = validateEmailInput(req.body);
    let token = req.body.token;
    let remoteip = req.connection.remoteAddress;
    var options_mailchimp = {
      method: "POST",
      url: "https://us20.api.mailchimp.com/3.0/lists/4799e3f2d1/members",
      headers: {
        Authorization: "apikey " + "072fb6a2692d5e1853bf16b6eab48b69-us20",
        "Cache-Control": "no-cache",
        "Content-Type": "application/json"
      },
      body: {
        email_address: req.body.email,
        status: "subscribed"
      },
      json: {
        email_address: req.body.email,
        user: "ericpuskas:072fb6a2692d5e1853bf16b6eab48b69-us20",
        status: "subscribed"
      }
    };
    checkToken(token, remoteip).then(response => {
      if (response !== "OK") {
        errors.error_message = "Failed captcha verification";
        return res.status(400).json(errors);
      }
      if (!isValid || !isEmpty(errors)) {
        // Return any errors with 400 statusn
        return res.status(400).json(errors);
      }
      request(options_mailchimp)
        .then(function(body) {
          if (body.statusCode === 400) {
            errors.error_message = `${req.body.email} is already subscribed.`;
            return res.status(400).json(errors);
          } else {
            return res
              .status(200)
              .json(
                "Thank you for subscribing! You'll receive updates regularly. If you wish to unsubscribe please contact us!"
              );
          }
        })
        .catch(function(err) {
          errors.error_message = `${req.body.email} is already subscribed.`;
          return res.status(400).json(errors);
        });
    });
  } catch (err) {
    return res.status(404).json(err);
  }
};
