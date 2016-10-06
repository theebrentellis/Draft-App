var Player = require("./../controllers/PlayerController.js");
var League = require("./../controllers/LeagueController.js");
var User = require("./../controllers/UserController.js");
var passport = require("./../config/passport.js");
// var passport = require("passport");
// var Authenticate = require("./../controllers/AuthenticationController.js");

var jwt = require("express-jwt");

var auth = jwt({
    secret: "Draft_Secret",
    userProperty: "payload"
});

module.exports = function(app){

    //User Calls
    app.post("/register", function(req, res){
        User.register(req, res);
    });

    app.post("/login", function(req, res){
        User.login(req, res);
    });
    app.post("/deleteAllUsers", function(req, res){
        User.deleteAllUsers(req, res);
    });

    //Player Calls
    app.post("/getAll", function(req, res){
        Player.getAll(req, res);
    });
    app.get("/getPlayers", function(req, res){
        Player.getPlayers(req, res);
    });
    app.patch("/draftPlayer/:_id", function(req, res){
        Player.draftPlayer(req, res);
    });
    app.get("/getDraftedPlayers", function(req, res){
        Player.getDraftedPlayers(req, res);
    });
    app.post("/newDraft", function(req, res){
        Player.newDraft(req, res);
    });

    //League Calls
    app.post("/createLeague", function(req, res){
        League.createLeague(req, res);
    });
    app.get("/getLeague", function(req, res){
        League.getLeague(req, res);
    });
    app.post("/clearAll", function(req, res){
        League.clearAll(req, res);
    });

};