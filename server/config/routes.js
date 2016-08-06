var Player = require("./../controllers/PlayerController.js");

module.exports = function(app){
    app.post("/getAll", function(req, res){
        //console.log(req);
        Player.getAll(req, res);
    });

    app.post("/draft", function(req, res){
        Player.draft(req, res);
    });
};