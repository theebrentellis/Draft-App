var mongoose = require("mongoose");
var crypto = require("crypto");
var jwt = require("jsonwebtoken");


//Draft Schema
var DraftSchema = new mongoose.Schema({
    displayName: String,
    position: String,
    drafted: Boolean,
    drafted_by: String

});
mongoose.model("Draft", DraftSchema);


//League Schema
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


//User Schema
var userSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    hash: String,
    salt: String
});
userSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString("hex");
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString("hex");
};
userSchema.methods.validPassword = function(password){
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString("hex");
    return this.hash === hash;
};
userSchema.methods.generateJwt = function(){
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this.id,
    userName: this.userName,
    firstName: this.firstName,
    exp: parseInt(expiry.getTime() / 1000),
  }, "Draft_Secret");
};
mongoose.model("User", userSchema);


//Chat Schema
var chatSchema = new mongoose.Schema({
    message: String,
    userName: String,
    // _leagueId: Schema.Types.ObjectId
});
mongoose.model("Chat", chatSchema);
