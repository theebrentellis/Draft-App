var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

//Chat Schema
var chatSchema = new mongoose.Schema({
    leagueId: {
        type: ObjectId,
        ref: "League"
    },
    chat: [{
        message: String,
        user: {
            type: ObjectId,
            ref: "User"
        }
    }]
    
});
mongoose.model("Chat", chatSchema);