var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var Chat = mongoose.model("Chat");
var Draft = mongoose.model("Draft");

//League Schema
var LeagueSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    _drafts: [ObjectId],
    commish_id: [ObjectId],
    size: Number,
    teams: [{
        _user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        pick: Number
    }],
    messages: [{
        message: String,
        _user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        _id: false
    }],
    token: String
});
LeagueSchema.methods.populateLeague = function (leagueId) {
    return this.model("League").findOne({_id: leagueId})
        .populate({
            path: "teams._user",
            model: "User",
            select: "userName"
        })
        .populate({
            path: "messages._user",
            model: "User",
            select: "userName"
        })
        .populate({
            path: "_drafts",
            model: "Draft",
            select: ["season", "completed"]
        })
        .exec().then((league) => {
            return league;
        }, (error) => {
            console.log(error);
        });
        // .exec(function(err, league){
        //     if (league) {
        //         callback(league);
        //     }
        //     if (err) {
        //         console.log("Error: " + err);
        //     }
        // });
};
mongoose.model("League", LeagueSchema);
