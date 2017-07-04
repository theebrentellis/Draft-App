let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
// const BasicStrategy = require('passport-http').BasicStrategy;
// var FacebookStrategy = require("passport-facebook")
let GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const configAuth = require("./auth.js");

let mongoose = require('mongoose');

let User = mongoose.model('User');

module.exports = function (passport, app) {
  // passport.serializeUser(function (token, done) {
  //   done(null, token);
  // });

  // passport.deserializeUser(function (id, done) {
  //   User.findById(id, function (err, user) {
  //     console.log(err);
  //     console.log(user);
  //     done(err, user);
  //   });
  // });

  passport.use(new LocalStrategy(
    {
      usernameField: 'email'
    },
    function (email, password, done) {
      User.findOne({ email: email }, function (err, user) {
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
        let token = user.generateJwt();

        return done(null, token);
        // user.populateUserLeagues(user._id, function(user){
        //   let token;
        //   token = user.generateJwt();
        //   console.log(token);
        //   return done(null, token);
        //   // return done(null, {"token": token});
        // });
      });
    }));

    passport.use(new GoogleStrategy({
        clientID: configAuth.googleAuth.clientID,
        clientSecret: configAuth.googleAuth.clientSecret,
        callbackURL: configAuth.googleAuth.callbackURL,
    }, function(token, refreshToken, profile, done){
        console.log(token);
        process.nextTick(function(){
            User.findOne({"email": profile.id}, function(err, user){
                if(err){
                    return done(err);
                }
                if(user){
                    return done(null, user);
                }
                else{
                    var newUser = new User();
                    
                    // newUser.google.id = profile.id;
                    newUser.email = profile.id;
                    newUser.userName = profile.name.givenName;
                    newUser.firstName = profile.displayName;

                }
            });
        });
    }));
};
