var Player = require("./../controllers/PlayerController.js");

module.exports = function(app){
    app.post("/getAll", function(req, res){
        //console.log(req);
        Player.getAll(req, res);
    });

    // app.get("/getPlayers", function(req, res){
    //     console.log(req.params);
    //     Player.getPlayers(req, res);
    // });

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
};