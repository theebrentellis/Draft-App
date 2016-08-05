var Player = require("./../controllers/PlayerController.js");

module.exports = function(app){
    app.get("/getAll", function(req, res){
        Player.getAll(req, res);
    });

    app.post("/draft", function(req, res){
        Player.draft(req, res);
    });
};