var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

//Draft Schema
var DraftSchema = new mongoose.Schema({
    leagueId: {
        type: ObjectId,
        ref: "League"
    },
    draft: [{
        team:{
            type: ObjectId,
            ref: "User"
        },
        picks: [{
            type: ObjectId,
            ref: "Player"
        }]
    }],

});
mongoose.model("Draft", DraftSchema);