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
          console.log("Chat Save Error: " + err);
        }
      });

      //Create and save new Draft schema
      var draft = new Draft();

      draft.save(function(err, draft){
        if(err){
          console.log("Draft Save Error: " + err);
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

      league.save(function (err, league) {
        if (err) {
          console.log('League Save Error: ' + err);
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
    //Gets League after user sets current league
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
    //Gets All Leagues
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
    //Lets User join league
    joinLeague: function (req, res) {
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
              user.populateUserLeagues(req.body.userId, function (user) {
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

    //Start Draft
      //Sets draft order
    startDraft: function(req, res){
      console.log(req.body.draftId);
      // console.log(req.body.draftOrder._id);

      for(var x in req.body.draftOrder){
        Draft.update({_id: req.body.draftId},
        {
          $addToSet: {
            "draft": {
              "_id": req.body.draftOrder[x]._id
            }
          }
        }, {
          upsert: true
        }, function(err, draft){
          if(err){
            console.log(err);
          }
          if(draft){
            console.log(draft);
          }
        });
      }
      
    },

    //Deletes All Saved Leagues
      //For developement use only; Not for production
    leaguesClearAll: function (req, res) {
      League.remove({}, function (err, results) {
        if (err) {
          console.log('Error: ' + err);
        } else {
          console.log('All Leagues Cleared!');
          res.json(results);
        }
      });
    },
    //Deletes All Saved Drafts
      //For development user only; Not for production
    deleteAllDrafts: function(req, res){
      Draft.remove({}, function(err, results){
        if(err){
          console.log("Error: " + err);
        }
        if(results){
          console.log("All Drafts Cleared");
        }
      });
    }

  };
})();
