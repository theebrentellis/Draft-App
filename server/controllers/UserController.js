var passport = require("passport");
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var crypto = require("crypto");

var User = mongoose.model("User");

var sendJSONresponse = function(res, status, content){
  res.status(status);
  res.json(content);
};

function setPassword(password){
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString("hex");
  return this.hash;
}
function setSalt(){
  this.salt = crypto.randomBytes(16).toString("hex");
  return this.salt;
}
function setHash(password){
  this.hash = crypto.pbkdf2Sync(password, setSalt, 1000, 64).toString("hex");
  return this.hash;
}

function validPassword(password){
  var hash = crypto.pbkdf2Sync(passport, this.salt, 1000, 64).toString("hex");
  return this.hash === hash;
}

function generateJwt(){
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this.id,
    userName: this.userName,
    firstName: this.firstName,
    exp: parseInt(expiry.getTime() / 1000),
  }, "Draft_Secret");
}

module.exports = (function () {
  return {

    register: function(req, res){

      var user = new User();
      
      user.userName = req.body.userName;
      user.firstName = req.body.firstName;
      user.setPassword(req.body.password);
      user.save(function(err){
        var token;
        token = user.generateJwt();
        console.log(token);
        res.json({
          "token": token
        });
      });
    },

    login: function(req, res){
      passport.authenticate("local", function(err, user, info){
        var token;

        if(err){
          res.status(404).json(err);
          return;
        }
        if(user){
          token = user.generateJwt()
          res.status(200);
          res.json({
            "token": token
          });
        }
        else{
          res.status(401).json(info);
        }
      })(req, res);
    },

    profileRead: function(req, res){
      if(!req.payload._id){
        res.status(401).json({
          "message": "UnathorizedError: private profile"
        });
      }
      else{
        User.findById(req.payload._id).exec(function(err, user){
          res.status(200).json(user);
        });
      }
    }
    
  };
})();


