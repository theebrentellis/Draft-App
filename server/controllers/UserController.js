var passport = require("passport");
var mongoose = require('mongoose');
var jwt = require('express-jwt');

var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content){
  res.status(status);
  res.json(content);
};

module.exports = (function () {
  return {

    register: function(req, res){
      var user = new User()

      user.userName = req.body.userNmae;
      user.firstName = req.body.firstName;
      
      user.setPassword(req.body.password);

      user.save(function(err){
        var token;
        token = user.generateJwt();
        res.status(200);
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


