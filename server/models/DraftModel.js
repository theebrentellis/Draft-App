var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

//Draft Schema
var DraftSchema = new mongoose.Schema({
    league_id: {
        type: ObjectId,
        ref: "League"
    },
    draftOrder: [{
        _user: {
            type: ObjectId,
            ref: "User"
        },
        pick: Number,
        _id: false
    }],
    picks: [{
        _player: {
            type: ObjectId,
            ref: "Player",
        },
        _id: false
        
    }],
    onClock: {
        type: ObjectId,
        ref: "User"
    },
    started: Boolean,
    completed: Boolean,
    season: Number

});
mongoose.model("Draft", DraftSchema);