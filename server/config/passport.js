var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var mongoose = require("mongoose");

var User = mongoose.model("User");

passport.use(new LocalStrategy({
    userName: "userName"
}, function(userName, password, done){
    User.findOne({userName: userName}, function(err, user){
        if(err){
            return done(err);
        }
        if(!user){
            return done(null, false, {
                message: "User Not Found."
            });
        }
        if(!user.validPassword(password)){
            return done(null, false, {
                message: "Password Incorrect."
            });
        }
        return done(null, user);
    });
}));