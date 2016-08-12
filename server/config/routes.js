var Player = require("./../controllers/PlayerController.js");
var League = require("./../controllers/LeagueController.js");

module.exports = function(app){

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