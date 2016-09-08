var mongoose = require("mongoose");
var crypto = require("crypto");
var jwt = require("jsonwebtoken");

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
    firstName: {
        type: String,
        required: true
    },
    hash: String,
    salt: String
});

UserSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString("hex");
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString("hex");
};

UserSchema.methods.validPassword = function(password){
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString("hex");
    return this.hash === hash;
};

UserSchema.methods.generateJwt = function(){
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this.id,
    userName: this.userName,
    firstName: this.firstName,
    exp: parseInt(expiry.getTime() / 1000),
  }, "Draft_Secret");
};
mongoose.model("User", UserSchema);