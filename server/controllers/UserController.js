var passport = require("passport");
var mongoose = require('mongoose');

var User = mongoose.model("User");

var sendJSONresponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports = (function () {
  return {

    register: function (req, res) {

      var user = new User();

      user.email = req.body.email;
      user.userName = req.body.userName;
      user.firstName = req.body.firstName;
      user.setPassword(req.body.password);
      user.save(function (err, success) {
        if (err) {
          console.log(err);
          res.json({
            message: "Username already exists!"
          });
        }
        else{
          var token;
          token = user.generateJwt();
          res.json({
            "token": token
          });
        }
      });
    },

    login: function (req, res) {
      console.log("In Server Login");
      var token;
      passport.authenticate("local", {session: false}, function(err, user, info){
        console.log(err);
        console.log(user);
        console.log(info);
        token = user.generateJwt();
        console.log(token);
        // res.json({
        //   "token": token
        // });
      });
      // User.findOne({
      //   userName: req.body.userName.toLowerCase()
      // }, function (err, user) {
      //   if (user === null) {
      //     console.log("Incorrect Username!");
      //     return res.json({
      //       message: "Incorrect Username!"
      //     });
      //   }
      //   if (user) {
      //     if (user.validPassword(req.body.password) === true) {
            
      //       user.populateUserLeagues(user._id, function(user){
      //         var token;
      //         token = user.generateJwt();
      //         res.json({
      //           "token": token
      //         });
      //       });
      //       // var token;
      //       // token = user.generateJwt();
      //       // res.json({
      //       //   "token": token
      //       // });
      //     } else {
      //       console.log("Incorrect Password!");
      //       res.json({
      //         message: "Incorrect Password!"
      //       });
      //     }
      //   }
      // });
    },

    deleteAllUsers: function (req, res) {
      User.remove({}, function (err, results) {
        if (err) {
          console.log(err);
        } else {
          console.log("All Users Cleared");
        }
      });
    },

    userPopulateLeague: function(req, res){
      theUser = req.params.userID;
      User.findById(id, function(err, user){
        if(user){
          user.populateUserLeague(function(data){
            console.log(data);
            res.json(data);
          });
        }
      });

    },

    updateUserLeague: function(req, res){
      console.log("updateUserLeague");
      // User.findById(id, function(err, user){
      //   if (err){
      //     return res.json({
      //       message: "Error Finding User"
      //     });
      //   }
      //   else{
      //     user._leagueId = "";
      //     user.save(function(err, user){
      //       if(err){
      //         return res.json({
      //           message: "Error Updating User"
      //         });
      //       }
      //       else{
      //         var token;
      //         token = user.generateJwt();
      //         res.json({
      //           "token": token
      //         });
      //       }
      //     });
      //   }
      // });
    },

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