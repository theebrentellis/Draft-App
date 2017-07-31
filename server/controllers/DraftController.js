let mongoose = require('mongoose');

let Chat = mongoose.model("Chat");
let Draft = mongoose.model("Draft");
let League = mongoose.model("League");

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
        }
    }
})();