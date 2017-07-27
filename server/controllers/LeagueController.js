let mongoose = require('mongoose');
const randomstring = require('randomstring');

let League = mongoose.model('League');
let User = mongoose.model('User');
let Chat = mongoose.model("Chat");
let Draft = mongoose.model("Draft");

module.exports = (function () {
  return {

    //Creates new League
    //Creates new chat, draft and league schemas; updates all new schemas with IDs
    //Updates User with new league and returns token
    createLeague: function (req, res) {
      //Create and save new Chat schema
      let chat = new Chat();
      chat.save(function (err, chat) {
        if (err) {
          console.log("Chat Save Error: " + err);
        }
      });

      //Create and save new Draft schema
      let season = new Date().getFullYear();
      let draft = new Draft({
        season: season
      });
      draft.save(function (err, draft) {
        if (err) {
          console.log("Draft Save Error: " + err);
        }
      });

      //Generate League Code
      let accessToken = randomstring.generate({
        length: 6,
        charset: 'alphanumeric',
        capitalization: 'lowercase'
      });

      League.findOne({ 'token': accessToken }, (err, league) => {
        if (err) {
          console.log(err);
        }
        if (league) {
          return res.json({
            error: "Error generating unique access token"
          });
        }
      });

      //Create and save new League schema
      let league = new League({
        leagueName: req.body.leagueName,
        draft_id: draft._id,
        chat_id: chat._id,
        commish_id: [req.body.user_id],
        teams: [{ _user: req.body.user_id }],
        token: accessToken,
        size: req.body.leagueSize
      });

      league.save(function (err, league) {
        if (err) {
          console.log('League Save Error: ' + err);
        }
        if (league) {
          //If new league is successfully created update Chat schema with League ID
          Chat.findByIdAndUpdate(league.chat_id, {
            $set: {
              league_id: league._id
            }
          }, {
              new: true
            }, function (err, chat) {
              if (err) {
                console.log(err);
              }
            });

          //If new League is successfully created update Draft schema with League ID
          Draft.findByIdAndUpdate(league.draft_id[0], {
            $set: {
              league_id: league._id,
              started: false
            }
          }, {
              new: true
            }, function (err, draft) {
              if (err) {
                console.log(err);
              }
            });

          //If new League is successfully created update User with League ID
          User.findByIdAndUpdate(req.body.user_id, {
            $push: {
              leagues: league._id
            }
          }, {
              new: true
            }, function (err, user) {
              if (user) {
                //If User is successfully updated populate User with Leagues and return token to client
                user.populateUserLeagues(req.body.user_id, function (user) {
                  let token = user.generateJwt();
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
      League.findById(req.query._id)
        .then((league) => {
          if (league !== null) {
            league.populateLeague(req.query._id, function (league) {
              res.json(league);
            });
          }
        }, (error) => {
          console.log(error);
        });
    },
    //Lets User join league
    joinLeague: function (req, res) {
      League.findOneAndUpdate({
        token: req.body.league_code
      }, {
          $addToSet: {
            teams: {
              _user: req.body.user_id
            }
          }
        }, {
          new: true
        }).then((league) => {
          if (league == null) {
            res.json({
              message: "Incorrect League Code"
            });
          }
          else {
            User.findByIdAndUpdate(req.body.user_id, {
              $push: {
                leagues: league._id
              }
            }, {
                new: true
              }).then((user) => {
                if (user !== null) {
                  user.populateUserLeagues(req.body.user_id, function (user) {
                    let token = user.generateJwt();
                    res.json({
                      token: token,
                      message: 'Joined New League!'
                    });
                  });
                }
                else {
                  res.json({
                    message: 'Error Updating User With New League'
                  });
                }
              }, (error) => {
                console.log(error);
              });
          }
        }, (error) => {
          console.log("Error: " + error)
        });
    },


    //Sets draft order
    //Start Draft
    startDraft: function (req, res) {

    },

    newLeagueMessage: (req, res) => {
      League.findByIdAndUpdate(req.body.leagueID, {
        $addToSet: {
          messages: {
            message: req.body.message,
            _user: req.body.userID
          }
        },
      }, {
          new: true
        }).then((league) => {
          league.populateLeague(req.body.leagueID, (league) => {
            res.json(league);
          });
        })
    },
    updateTeamPick: (req, res) => {
      League.findOneAndUpdate({
        _id: req.params.id,
        'teams._id': req.body.team._id
      }, {
          $set: {
            'teams.$.pick': req.body.pick
          }
        }, {
          new: true
        }).then((league) => {
          league.populateLeague(req.params.id, (response) => {
            console.log(response);
            res.json(response);
          }, (error) => {
            console.log(error);
          });
        }, (error) => {
          console.log("Error: " + error);
        });
    },

  };
})();
