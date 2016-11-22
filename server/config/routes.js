var Player = require("./../controllers/PlayerController.js");
var League = require("./../controllers/LeagueController.js");
var User = require("./../controllers/UserController.js");
var Chat = require("./../controllers/ChatController.js");

// var auth = jwt({
//     secret: "Draft_Secret",
//     userProperty: "payload"
// });

module.exports = function(app, passport){

    //User Calls
    app.post("/register", function(req, res){
        User.register(req, res);
    });
    app.post("/login", passport.authenticate("local", {session: false}), function(req, res){
        res.send(req.user);
    });
    app.post("/deleteAllUsers", function(req, res){
        User.deleteAllUsers(req, res);
    });
    // app.get("/getUserLeagues", function(req, res){
    //     User.getUserLeagues(req, res);
    // });

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
    app.post("/leaguesClearAll", function(req, res){
        League.leaguesClearAll(req, res);
    });

    //Chat Calls
    app.post("/message", function(req, res){
        Chat.postMessage(req, res);
    });
    app.post("/deleteAllChat", function(req, res){
        Chat.deleteAllChat(req, res);
    });

    //DraftCalls
    app.post("/deleteAllDrafts", function(req, res){
        League.deleteAllDrafts(req, res);
    })
};

