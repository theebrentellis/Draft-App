var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

//Draft Schema
var DraftSchema = new mongoose.Schema({
    _league: {
        type: ObjectId,
        ref: "League"
    },
    field: [{
        _user: {
            type: ObjectId,
            ref: "User"
        },
        position: Number,
        _id: false,
        picks: [{
            _player: {
                type: ObjectId,
                ref: 'Player'
            },
            _id: false
        }]

    }],
    _chat: {
        type: ObjectId,
        ref: "Chat"
    },
    completed: Boolean,
    season: Number

});
DraftSchema.methods.populateDraft = function (draftID) {
    return this.model("Draft").findOne({ _id: draftID })
        .populate({
            path: "field.picks._player",
            model: "Player"
        }).exec().then((draft) => {
            return draft;
        }, (error) => {
            console.log(error);
        });
}
mongoose.model("Draft", DraftSchema);