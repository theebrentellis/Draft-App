var mongoose = require("mongoose");

var DraftSchema = new mongoose.Schema({
    player_name: String,
    player_position: String,
    draft_team: String

});

mongoose.model("Draft", DraftSchema);