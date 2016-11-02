var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

//Chat Schema
var chatSchema = new mongoose.Schema({
    message: String,
    userName: String,
    leagueId: ObjectId
});
mongoose.model("Chat", chatSchema);