var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

//Draft Schema
var DraftSchema = new mongoose.Schema({
    displayName: String,
    position: String,
    drafted: Boolean,
    draftedBy: String

});
mongoose.model("Draft", DraftSchema);