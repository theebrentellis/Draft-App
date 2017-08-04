let mongoose = require('mongoose');

let Chat = mongoose.model("Chat");
let Draft = mongoose.model("Draft");
let League = mongoose.model("League");
let Players = mongoose.model("Player");

module.exports = (() => {
    return {
        startDraft: (req, res) => {

            let chat = new Chat();

            let season = new Date().getFullYear();
            let draft = new Draft({
                _league: req.params.league_id,
                field: req.body.teams,
                _chat: chat._id,
                season: season
            });

            draft.save();

            League.findByIdAndUpdate(req.params.league_id,
                {
                    $push: {
                        _drafts: draft._id
                    }
                },
                {
                    new: true
                }).then((league) => {
                    league.populateLeague(req.params.league_id)
                        .then((league) => {
                            res.json(league);
                        }, (error) => {
                            console.log(error);
                        });
                }, (error) => {
                    console.log(error);
                });
        },

        getDraft: (req, res) => {
            return Draft.findById(req.params.draft_id).then((draft) => {
                return Players.find({}).limit(100).then((players) => {
                    console.log(draft);
                    console.log(players);
                    return res.status(200).json({ draft: draft, players: players });
                }, (error) => {
                    console.log(error);
                });
            }, (error) => {
                console.log(error);
            });
        },

        draftPlayer: (req, res) => {
            // console.log(req.body);
            // console.log(req.params);
            Draft.findOneAndUpdate({ _id: req.params.draft_id, "field.position": req.params.position },
                {
                    $addToSet: {
                        "field.$.picks": {
                            _player: req.params.player_id
                        }
                    }
                }, {
                    new: true
                }).then((draft) => {
                    return res.sendStatus(201);
                }, (error) => {
                    console.log("Error: " + error);
                });
        },
    }
})();