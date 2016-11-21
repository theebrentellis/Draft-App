var mongoose = require('mongoose');

var League = mongoose.model('League');
var User = mongoose.model('User');
var Chat = mongoose.model("Chat");
var Draft = mongoose.model("Draft");

module.exports = (function () {
  return {
    //Creates new League
      //Creates new chat, draft and league schemas; updates all new schemas with IDs
      //Updates User with new league and returns token
    createLeague: function (req, res) {

      //Create and save new Chat schema
      var chat = new Chat();

      chat.save(function(err, chat){
        if(err){
          console.log(err);
        }
      });

      //Create and save new Draft schema
      var draft = new Draft();

      draft.save(function(err, draft){
        if(err){
          console.log(err);
        }
      });

      //Create and save new League schema
      var league = new League({
        leagueName: req.body.leagueName,
        draftOrder: req.body.userId,
        draft: draft._id,
        commish: req.body.userId,
        onClock: req.body.userId,
        chat: chat._id,
        draftStarted: false
      });

      console.log(league);

      league.save(function (err, league) {
        if (err) {
          console.log('Error: ' + err);
        }
        if (league) {
          //If new league is successfully created update Chat schema with League ID
          Chat.findByIdAndUpdate(chat._id, {
            $set: {
              leagueId: league._id
            }
          }, {
            new: true
          }, function(err, chat){
            if(err){
              console.log(err);
            }
            if(chat){
              console.log(chat);
            }
          });

          //If new League is successfully created update Draft schema with League ID
          Draft.findByIdAndUpdate(draft._id, {
            $set: {
              leagueId: league._id
            }
          }, {
            new: true
          }, function(err, draft){
            if(err){
              console.log(err);
            }
            if(draft){
              console.log(draft);
            }
          });

          //If new League is successfully created update User with League ID
          User.findByIdAndUpdate(req.body.userId, {
            $push: {
              leagues: league._id
            }
          }, {
            new: true
          }, function (err, user) {
            if (user) {
              //If User is successfully updated populate User with Leagues and return token to client
              user.populateUserLeagues(req.body.userId, function (user) {
                var token;
                token = user.generateJwt();
                res.json({
                  'token': token,
                  message: 'Created New League!'
                });
              });
            }
            if (err) {
              console.log('Error: ' + err);
              res.json({
                message: 'Error Updating User With New League'
              });
            }
          });
        }
      });
    },

    getLeague: function (req, res) {
      League.findById(req.query._id, function (err, league) {
        if (err) {
          console.log('Error: ' + err);
        }
        if (league) {
          league.populateUsers(req.query._id, function (league) {
            res.json(league);
          });
        }else {
          console.log('getLeague Error!');
        }
      });
    },

    getAllLeagues: function (req, res) {
      League.find({}, function (err, leagues) {
        if (err) {
          console.log('Error: ' + err);
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
      }, function (err, league) {
        if (league) {
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
                  'token': token
                });
              });
            }
            if (err) {
              console.log('Error: ' + err);
              res.json({
                message: 'Error Updating User With New League'
              });
            }
          });
        }
        if (err) {
          console.log('Error: ' + err);
        }
      });
    },

    leaguesClearAll: function (req, res) {
      League.remove({}, function (err, results) {
        if (err) {
          console.log('Error: ' + err);
        } else {
          console.log('All Leagues Cleared!');
          res.json(results);
        }
      });
    }

  };
})();
