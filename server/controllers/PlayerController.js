var mongoose = require("mongoose");

var Player = mongoose.model("Player");
var Draft = mongoose.model("Draft");

let request = require("request");

module.exports = (function () {
    return {
        downloadPlayers: (req, res) => {
            // let position = ["DEF", "QB", "RB", "WR", "TE", "K"];
            // for (var x in position) {
            //     request.get({ url: "http://www.fantasyfootballnerd.com/service/players/json/rtj7893jmh8t/" + position[x] + "/" }, (error, response, body) => {
            //         let players = JSON.parse(body);
            //         // console.log(players);
            //         for (var y in players.Players) {
            //             let player = new Player({ displayName: players.Players[y].displayName, position: players.Players[y].position, team: players.Players[y].team });
            //             player.save((err, results) => {
            //                 if (err) {
            //                     console.log("Error");
            //                 }
            //             });
            //         }
            //     });
            // }
            request.get({ url: " https://www.fantasyfootballnerd.com/service/draft-rankings/json/rtj7893jmh8t/" }, (error, response, body) => {
                let players = JSON.parse(body);
                // console.log(players);
                for (var y in players.DraftRankings) {
                    let player = new Player({ displayName: players.DraftRankings[y].displayName, position: players.DraftRankings[y].position, team: players.DraftRankings[y].team, overallRank: players.DraftRankings[y].overallRank, positionRank: players.DraftRankings[y].positionRank, byeWeek: players.DraftRankings[y].byeWeek });
                    player.save((err, results) => {
                        if (err) {
                            console.log("Error");
                        }
                    });
                }
            });
        },

        getPlayers: function (req, res) {
            Player.find({ position: req.query.position }, function (err, results) {
                if (err) {
                    console.log("Error: " + err);
                }
                else {
                    res.json(results);
                }
            });
        },

        getDraftedPlayers: function (req, res) {
            Player.find({ drafted: true }, function (err, results) {
                if (err) {
                    console.log("Error: " + err);
                }
                else {
                    res.json(results);
                }
            });
        },

        deleteAllPlayers: function (req, res) {
            Player.remove({}, function (err, results) {
                if (err) {
                    console.log("Error: " + err);
                    res.json({
                        message: "Error Deleting All Players"
                    });
                }
                else {
                    console.log(results);
                    res.json(results);
                }
            });
        }
    };
})();