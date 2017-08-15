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
        placeholder: String,
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
        })
        .populate({
            path: "field._user",
            model: "User",
            select: "userName"
        }).exec().then((draft) => {
            // console.log(draft);
            return draft;
        }, (error) => {
            console.log(error);
        });
}
mongoose.model("Draft", DraftSchema);