var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

//League Schema
var LeagueSchema = new mongoose.Schema({
    leagueName: {
        type: String,
        unique: true,
        required: true
    },
    draftOrder: [ObjectId],
    commish: [ObjectId],
    onClock: ObjectId,
    draftStarted: Boolean,
    // chat: chatSchema,
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
