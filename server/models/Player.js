var mongoose = require("mongoose");

var DraftSchema = new mongoose.Schema({
    displayName: String,
    position: String,
    drafted: Boolean,
    drafted_by: String

});

mongoose.model("Draft", DraftSchema);