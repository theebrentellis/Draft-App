var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

//Chat Schema
var chatSchema = new mongoose.Schema({
    league_id: {
        type: ObjectId,
        ref: "League"
    },
    chat: [{
        message: String,
        user_id: {
            type: ObjectId,
            ref: "User"
        }
    }]
    
});
mongoose.model("Chat", chatSchema);