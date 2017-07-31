var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

//Chat Schema
var chatSchema = new mongoose.Schema({
    chats: [{
        message: String,
        _user: {
            type: ObjectId,
            ref: "User"
        }
    }]
});
mongoose.model("Chat", chatSchema);