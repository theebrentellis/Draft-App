var Player = require("./../controllers/PlayerController.js");
var League = require("./../controllers/LeagueController.js");
var Authenticate = require("./../controllers/AuthenticationController.js");

module.exports = function(app){

    //Login Calls
    app.get("/loginGetCurrent", function(req, res){
        Authenticate.getCurrentUser(req, res);
    });
    app.get("/loginGetAll", function(req, res){
        User.registerNew(req, res);
    });
    app.get("loginGetByID", function(req, res){
        Authenticate.getById(req, res);
    });
    // app.get("/loginGetByUserName/", function(req, res){
    //     Authenticate.(req, res);
    // });
    app.post("/loginCreate", function(req, res){
        Authenticate.registerUser(req, res);
    });
    app.put("/loginUpdate/", function(req, res){
        Authenticate.updateUser(req, res);
    });
    app.post("/loginDelete", function(req, res){
        Authenticate.deleteUser(req, res);
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