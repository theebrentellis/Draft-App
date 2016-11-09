var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Chat = mongoose.model("Chat");
var Draft = mongoose.model("Draft");

//League Schema
var LeagueSchema = new mongoose.Schema({
    leagueName: {
        type: String,
        unique: true,
        required: true
    },
    commish: [ObjectId],
    draftOrder: [ObjectId],
    onClock: ObjectId,
    draft: [Draft],
    chat: [Chat],
    draftStarted: Boolean,
});
LeagueSchema.methods.populateUsers = function(leagueId, callback){
    this.model("League").findOne({_id: leagueId})
        .populate({
            path: "draftOrder",
            model: "User",
            select: "firstName"
        })
        .populate({
            path: "commish",
            model: "User",
            select: "_id"
        })
        .exec(function(err, league){
            if(league){
                console.log(league);
                callback(league);
            }
        });
};
mongoose.model("League", LeagueSchema);
