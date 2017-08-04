var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

//Player Schema
var PlayerSchema = new mongoose.Schema({
    displayName: String,
    position: String,
    team: String,
});
mongoose.model("Player", PlayerSchema);