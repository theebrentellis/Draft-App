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
        type: ObjectId,
        ref: "User"
    }],
    picks: [{
        type: ObjectId,
        ref: "Player",
    }],
    onClock: ObjectId,
    started: Boolean,

});
mongoose.model("Draft", DraftSchema);