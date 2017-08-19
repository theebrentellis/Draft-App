var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

//Player Schema
var PlayerSchema = new mongoose.Schema({
    displayName: String,
    position: String,
    team: String,
    overallRank: Number,
    positionRank: Number,
    byeWeek: Number
});
mongoose.model("Player", PlayerSchema);