var mongoose = require('mongoose');

var League = mongoose.model('League');
var User = mongoose.model("User");

module.exports = (function () {
  return {
    createLeague: function (req, res) {

      var userId = req.body.userId;

      var league = new League({
        leagueName: req.body.leagueName,
        draftOrder: userId,
        commish: userId
      });

      league.save(function (err, league) {
        if (err) {
          console.log('Error: ' + err);
        }
        if (league) {
          console.log(league._id);
        }
      });
      if (league._id) {
        User.findByIdAndUpdate(userId, {
          $push: {
            leagues: league._id
          }
        }, {
          new: true
        }, function (err, user) {
          if (user) {
            user.populateUserLeagues(userId, function (user) {
              var token;
              token = user.generateJwt();
              res.json({
                "token": token,
                message: "Created New League!"
              });
            });
          }
          if (err) {
            console.log("Error: " + err);
            res.json({
              message: "Error Updating User With New League"
            });
          }
        });
      }
    },

    getLeague: function (req, res) {
      League.findById(req.query._id, function (err, league) {
        if (err) {
          console.log('Error: ' + err);
        }
        if(league){
          league.populateUsers(req.query._id, function(league){
            res.json(league);
          });
        }
        else {
          console.log("getLeague Error!");
        }
      });
    },

    getAllLeagues: function (req, res) {
      League.find({}, function (err, leagues) {
        if (err) {
          console.log("Error: " + err);
        }
        if (leagues) {
          res.json(leagues);
        }
      });
    },

    joinLeague: function (req, res) {
      console.log(req.body.userId);
      League.findByIdAndUpdate(req.body.leagueId, {
        $push: {
          draftOrder: req.body.userId
        }
      }, {
        new: true
      }, function(err, league){
        if(league){
          User.findByIdAndUpdate(req.body.userId, {
          $push: {
            leagues: req.body.leagueId
          }
        }, {
          new: true
        }, function (err, user) {
          if (user) {
            console.log(user);
            user.populateUserLeagues(req.body.userId, function (user) {
              console.log(user);
              var token;
              token = user.generateJwt();
              res.json({
                "token": token,
              });
            });
          }
          if (err) {
            console.log("Error: " + err);
            res.json({
              message: "Error Updating User With New League"
            });
          }
        });
        }
        if(err){
          console.log("Error: " + err);
        }
      });

      
    },

    leaguesClearAll: function (req, res) {
      League.remove({}, function (err, results) {
        if (err) {
          console.log('Error: ' + err);
        } else {
          console.log("All Leagues Cleared!");
          res.json(results);
        }
      });
    },

  };
})();