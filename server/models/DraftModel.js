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
        _id:{
            type: ObjectId,
            ref: "User",
            autoIndexId: false,
            _id: false,
        },
        picks: [{
            type: ObjectId,
            ref: "Player",
            autoIndexId: false,
            _id: false
        }]
    }],

});
mongoose.model("Draft", DraftSchema);