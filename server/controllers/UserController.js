let passport = require("passport");
let mongoose = require('mongoose');

let User = mongoose.model("User");

let sendJSONresponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports = (function () {
  return {

    register: function (req, res) {

      let user = new User();

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
          let token = user.generateJwt();
          res.json({
            "token": token
          });
        }
      });
    },

    login: function (req, res) {
      console.log("In Server Login");
      // let token;
      // passport.authenticate("local", {session: false}, function(err, user, info){
      //   console.log(err);
      //   console.log(user);
      //   console.log(info);
      //   token = user.generateJwt();
      //   console.log(token);
      //   // res.json({
      //   //   "token": token
      //   // });
      // });
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
      //         let token;
      //         token = user.generateJwt();
      //         res.json({
      //           "token": token
      //         });
      //       });
      //       // let token;
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
    },

  };
})();