let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;
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
		createLeague: (req, res) => {

			//Generate League Code
			let accessToken = randomstring.generate({
				length: 6,
				charset: 'alphanumeric',
				capitalization: 'lowercase'
			});

			League.findOne({ 'token': accessToken }).exec((err, league) => {
				if (err) {
					console.log(err);
				}
				if (league) {
					return res.json({
						error: "Error generating unique access code."
					});
				}
			});

			//Create and save new League schema
			let league = new League({
				name: req.body.leagueName,
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
					return res.end();
				}
			});
		},

		//Gets League after user sets current league
		getLeague: (req, res) => {
			console.log("getLeague");
			League.findById(req.query._id)
				.then((league) => {
					if (league !== null) {
						league.populateLeague(req.query._id).then((league) => {
							res.json(league);
						}, (error) => {
							console.log(error);
						});
						// league.populateLeague(req.query._id, function (league) {
						//   res.json(league);
						// });
					}
				}, (error) => {
					console.log(error);
				});
		},

		//Lets User join league
		joinLeague: function (req, res) {
			console.log(req.body);
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
						console.log(league);
						return res.end();
					}
				}, (error) => {
					console.log("Error: " + error)
				});
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
					league.populateLeague(req.body.leagueID).then((league) => {
						res.json(league);
					}, (error) => {
						console.log(error);
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
					league.populateLeague(req.params.id)
						.then((response) => {
							res.json(response);
						}, (error) => {
							console.log(error);
						});
				}, (error) => {
					console.log("Error: " + error);
				});
		},

		deleteLeagueTeam: (req, res) => {
			League.findOneAndUpdate({ _id: req.params.league_id },
				{
					$pull: {
						teams: {
							_id: req.body.team_id
						}
					}
				}, {
					new: true
				}).then((league) => {
					console.log("League: " + league)
				}, (error) => {
					console.log(error);
				});
		},

		getUserLeagues: (req, res) => {
			console.log(req.params.id);
			return League.aggregate({ $match: { "teams._user": mongoose.Types.ObjectId(req.params.id)}})
				.exec().then((leagues) => {
					res.json(leagues);
				}, (error) => {
					console.log(error);
				});
		},
	};
})();
