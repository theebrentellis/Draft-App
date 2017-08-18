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
            return Draft.findById(req.params.draft_id).populate("field._user", "userName").then((draft) => {
                let sortedDraft = [];
                let sorted = false;
                let onClock = {};
                let x = 0;
                while (sorted == false) {
                    for (let y = 0; y < draft.field.length; y++) {
                        if (draft.field[y].picks[x]) {
                            sortedDraft.push(draft.field[y].picks[x]._player);
                        }
                        else {
                            onClock.position = draft.field[y].position;
                            if (draft.field[y]._user) {
                                onClock._user = draft.field[y]._user
                            } 
                            sorted = true;
                            break;
                        }
                    }
                    x++;
                    if (sorted == false) {
                        for (let z = 9; z >= 0; z--) {
                            if (draft.field[z].picks[x]) {
                                sortedDraft.push(draft.field[z].picks[x]._player);
                            }
                            else {
                                onClock.position = draft.field[z].position;
                                sorted = true;
                                break;
                            }
                        }
                        x++;
                    }
                }
                
                draft.populateDraft(draft._id).then((populatedDraft) => {
                    return Players.find({ _id: { $nin: sortedDraft } }).then((players) => {
                        let draft = {
                            onClock: onClock,
                            draft: populatedDraft,
                            availablePlayers: players
                        }
                        return res.status(200).json(draft);
                    }, (error) => {
                        console.log(error);
                    });
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