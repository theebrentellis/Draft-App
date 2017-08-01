var Player = require("./../controllers/PlayerController.js");
var League = require("./../controllers/LeagueController.js");
var User = require("./../controllers/UserController.js");
var Chat = require("./../controllers/ChatController.js");
var Draft = require('./../controllers/DraftController.js');

// var auth = jwt({
//     secret: "Draft_Secret",
//     userProperty: "payload"
// });

module.exports = function (app, passport) {

    //User Calls
    app.post("/register", function(req, res){
        User.register(req, res);
    });
    app.post('/login', passport.authenticate('local', {
        session: false
    }), (req, res) => {
        return res.json({ "token": req.user });
    });
    
    app.get("/leagues/user/:id", function(req, res){
        League.getUserLeagues(req, res);
    });

    //Player Calls
    app.post("/downloadPlayers", function(req, res){
        Player.downloadPlayers(req, res);
    });
    app.get("/getPlayers", function(req, res){
        Player.getPlayers(req, res);
    });
    app.post("/draftPlayer", function(req, res){
        Player.draftPlayer(req, res);
    });
    app.get("/getDraftedPlayers", function(req, res){
        Player.getDraftedPlayers(req, res);
    });
    app.post("/deleteAllPlayers", function(req, res){
        Player.deleteAllPlayers(req, res);
    });

    //League Calls
    app.post('/league/newMessage', (req, res) => {
        League.newLeagueMessage(req, res);
    });
    app.post('/league/:id', (req, res) => {
        League.updateTeamPick(req, res);
    });
    app.post('/league/:id', (req, res) => {
        League.updateTeamPick(req, res);
    });
    app.post('/league/:league_id/deleteLeagueTeam', (req, res) => {
        League.deleteLeagueTeam(req, res);
    });
    app.post('/league/:league_id/draft/new', (req, res) => {
        Draft.startDraft(req, res);
    });
    app.post("/createLeague", function(req, res){
        League.createLeague(req, res);
    });
    app.get("/getLeague", function(req, res){
        League.getLeague(req, res);
    });
    app.get("/getAllLeagues", function(req, res){
        League.getAllLeagues(req, res);
    });
    app.patch("/joinLeague", function(req, res){
        League.joinLeague(req, res);
    });
    




};

