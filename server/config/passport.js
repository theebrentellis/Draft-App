var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// var FacebookStrategy = require("passport-facebook")
// var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy
var mongoose = require('mongoose');

var User = mongoose.model('User');

module.exports = function (passport, app) {
  passport.serializeUser(function (token, done) {
    done(null, token);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  passport.use('local', new LocalStrategy(
    {
      usernameField: 'email',
      session: false
    },

    function (email, password, done) {
        // console.log(email);
        // console.log(password);
      User.findOne({email: email}, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          console.log('User Not Found');
          return done(null, false, {
            message: 'User Not Found'
          });
        }
        if (!user.validPassword(password)) {
          console.log('Wrong Password');
          return done(null, false, {
            message: 'Password Incorrect'
          });
        }
        var token;
        token = user.generateJwt();
        return done(null, {"token": token});
      });
    }));
};
