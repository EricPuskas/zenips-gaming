const jwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { SECRET_KEY } = require("../config/keys");
const { User } = require("../models");

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = SECRET_KEY;

module.exports = passport => {
  passport.use(
    new jwtStrategy(options, (jwtPayload, done) => {
      User.findById(jwtPayload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
