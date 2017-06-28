var mongoose = require("mongoose");
var crypto = require("crypto");
var jwt = require("jsonwebtoken");

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

//User Schema
var userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        reqired: true
    },
    userName: {
        type: String,
        unique: true,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    leagues: [ObjectId],
    hash: String,
    salt: String
});
userSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString("hex");
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString("hex");
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
    commish: this.commish,
    leagues: this.leagues,
    exp: parseInt(expiry.getTime() / 1000),
  }, "Draft_Secret");
};
userSchema.methods.populateUserLeagues = function(userId, callback){
    this.model("User").findOne({_id: userId})
    .populate({
        path: "leagues",
        model: "League",
        populate: {
            path: "commish",
            model: "League"
        },
    })
    .exec(function(err, user){
        if(user){
            callback(user);
        }
    });
};
mongoose.model("User", userSchema);