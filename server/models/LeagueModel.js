var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Chat = mongoose.model("Chat");
var Draft = mongoose.model("Draft");

//League Schema
var LeagueSchema = new mongoose.Schema({
    leagueName: {
        type: String,
        required: true
    },
    commish: [ObjectId],
    team: [ObjectId],
    drafts: [ObjectId],
    chat: ObjectId,
    
});
LeagueSchema.methods.populateUsers = function(leagueId, callback){
    this.model("League").findOne({_id: leagueId})
        .populate({
            path: "teams",
            model: "User",
            select: "_id"
        })
        .populate({
            path: "commish",
            model: "User",
            select: "_id"
        })
        .populate({
            path: "chat",
            model: "Chat",
            select: "_id"
        })
        .populate({
            path: "draft",
            model: "Draft",
            select: "_id"
        })
        .exec(function(err, league){
            if(league){
                callback(league);
            }
            if (err) {
                console.log(err);
            }
        });
};
mongoose.model("League", LeagueSchema);
