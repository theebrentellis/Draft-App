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
LeagueSchema.methods.populateLeague = function (leagueId, callback) {
    this.model("League").findOne({_id: leagueId})
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
                callback(league);
            }
            if (err) {
                console.log("Error: " + err);
            }
        });
};
mongoose.model("League", LeagueSchema);
