var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var Chat = mongoose.model("Chat");
var Draft = mongoose.model("Draft");

//League Schema
var LeagueSchema = new mongoose.Schema({
    leagueName: {
        type: String,
        required: true
    },
    draft_id: [ObjectId],
    chat_id: ObjectId,
    commish_id: [ObjectId],
    size: Number,
    teams: [{
        _user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        pick: Number,
        name: String,
        _id: false
    }],
    messages: [{
        message: String,
        _user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    }],
    token: String
});
LeagueSchema.methods.populateLeague = function (leagueId, callback) {
    this.model("League").findOne({_id: leagueId})
        // .populate({
        //     path: "teams.user_id",
        //     model: "User",
        //     select: "_id"
        // })
        // .populate({
        //     path: "commish",
        //     model: "User",
        //     select: "_id"
        // })
        // .populate({
        //     path: "chat",
        //     model: "Chat",
        //     select: "_id"
        // })
        .populate({
            path: "draft_id",
            model: "Draft",
            // select: "_id"
        })
        .exec(function(err, league){
            if (league) {
                console.log("League Model: " + league);
                // return league;
                callback(league);
            }
            if (err) {
                console.log(err);
            }
        });
};
mongoose.model("League", LeagueSchema);
