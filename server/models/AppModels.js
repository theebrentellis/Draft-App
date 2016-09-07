var mongoose = require("mongoose");

var DraftSchema = new mongoose.Schema({
    displayName: String,
    position: String,
    drafted: Boolean,
    drafted_by: String

});
mongoose.model("Draft", DraftSchema);

var LeagueSchema = new mongoose.Schema({
    leagueName: String,
    team1: String,
    team2: String,
    team3: String,
    team4: String,
    team5: String,
    team6: String,
    team7: String,
    team8: String,
    team9: String,
    team10: String
});
mongoose.model("League", LeagueSchema);

var UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    hash: String,
    salt: String
});
mongoose.model("User", UserSchema);