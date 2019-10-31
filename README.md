# Instructions

## Installation

- `npm install` in the root of the project for the back-end
- `cd` into client and `npm install` for the front-end

## Running the app

- Create a `.env` file in the root of the project
  - It must have the following fields:
    - CLOUDINARY_KEY
    - CLOUDINARY_SECRET
    - CLOUD_NAME
    - GMAIL_PW (used to send reset password emails, feature currently disabled due to Google switching to OAuth, will revise later)
    - GMAIL_USER
    - GOOGLE_RECAPTCHA_SECRET_KEY
    - MAILCHIMP_API_KEY
    - MAILCHIMP_URL
    - MAILCHIMP_USERNAME
    - MONGO_URI
    - PORT (usually I go with 3001)
    - REG_CODE (can be anything you wish, It's just a key to prevent people from registering, disable it if you wish.)
    - SECRET_KEY (Required for the JWT Token, what you assign to it, doesn't matter)
- You can [sign up with cloudinary](https://cloudinary.com/) (great image hosting platform with decent free tier) to get the secret, key and the cloud name.
- [Sign up with google reCaptcha](https://www.google.com/recaptcha/intro/v3.html)
- Sign up with [Mail Chimp](https://login.mailchimp.com/signup/) to enable the subscription feature
- Sign up with MongoDB Atlas and create a database, assign the URI to MONGO_URI in the `.env` file
- `node server.js` in the root of the project to start the server.
- `cd` into client and `npm start` to boot up the front-end.

## Notes

- I'm currently revising this codebase as it's older now and could use some bug fixing and upgrades. Feel free to contribute in any way.
