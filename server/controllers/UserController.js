var passport = require("passport");
var mongoose = require('mongoose');

var User = mongoose.model("User");

var sendJSONresponse = function(res, status, content){
  res.status(status);
  res.json(content);
};

module.exports = (function () {
  return {

    register: function(req, res){

      var user = new User();
      
      user.userName = req.body.userName.toLowerCase();
      user.firstName = req.body.firstName;
      user.setPassword(req.body.password);
      user.save(function(err, user){
        console.log(err);
        console.log(user);
        var token;
        token = user.generateJwt();
        res.json({
          "token": token
        });
      });
    },

    login: function(req, res){
      User.findOne({userName: req.body.userName.toLowerCase()}, function(err, user){
        if(user === null){
          console.log("Incorrect Username!");
          return res.json({
            message: "Incorrect Username!"
          });
        }
        if(user){
          if(user.validPassword(req.body.password) === true){
            var token;
            token = user.generateJwt();
            res.json({
              "token": token
            });
          }
          else{
            console.log("Incorrect Password!");
            res.json({
              message: "Incorrect Password!"
            });
          }
        }      
      });
    },

    deleteAllUsers: function(req, res){
      console.log("deleteAllUsers");
      User.remove({}, function(err, results){
        if(err){
          console.log(err);
        }
        else{
          console.log(results);
        }
      });
    }

    // profileRead: function(req, res){
    //   if(!req.payload._id){
    //     res.status(401).json({
    //       "message": "UnathorizedError: private profile"
    //     });
    //   }
    //   else{
    //     User.findById(req.payload._id).exec(function(err, user){
    //       res.status(200).json(user);
    //     });
    //   }
    // }
    
  };
})();


