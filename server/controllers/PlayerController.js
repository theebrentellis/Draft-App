var mongoose = require("mongoose");

var Player = mongoose.model("Player");

var request = require("request");

module.exports = (function(){
    return{
        downloadPlayers: function(req, res){
            var position = ["QB", "RB", "WR", "TE", "K", "DEF"];
            
            for(var x in position){
                request.get({url: "http://www.fantasyfootballnerd.com/service/players/json/rtj7893jmh8t/" + position[x]}, function(error, response, body){
                    var thePlayers = JSON.parse(body);
                    for(var y in thePlayers.Players){
                        var player = new Player({displayName: thePlayers.Players[y].displayName, position: thePlayers.Players[y].position});
                        player.save(function(err, results){
                            if(err){
                                console.log("Error");
                            }
                        });
                    }
                    console.log("Done!");
                });
            }
            
            // for(var x in req.body.Players){
            //     var player = new Player({displayName: req.body.Players[x].displayName, position: req.body.Players[x].position, drafted: false} );
            //     player.save(function(err, results){
            //         if(err){
            //             console.log("Error: "+err);
            //         }
            //         else{
            //             console.log(results);
            //             // res.json(results);
            //         }
            //     });
            // }
        },

        getPlayers: function(req, res){
            Player.find({position: req.query.position}, function(err, results){
                if(err){
                    console.log("Error: "+err);
                }
                else{
                    res.json(results);
                }
            });
        },

        draftPlayer: function(req, res){
            Player.update({"_id": req.params._id},{$set:{drafted:true}}, function(err, results){
                if(err){
                    console.log("Error: "+err);
                }
                else{
                    res.json(results);
                }
            });
        },

        getDraftedPlayers: function(req, res){
            Player.find({drafted: true}, function(err, results){
                if(err){
                    console.log("Error: "+err);
                }
                else{
                    res.json(results);
                }
            });
        },

        newDraft: function(req, res){
            Player.remove({}, function(err, results){
                if(err){
                    console.log("Error: "+err);
                    res.json(err);
                }
                else{
                    console.log(results);
                    res.json(results);
                }
            });
        },
        deleteAllPlayers: function(req, res){
            Player.remove({}, function(err, results){
                if(err){
                    console.log("Error: "+err);
                    res.json({
                        message: "Error Deleting All Players"
                    });
                }
                else{
                    console.log(results);
                    res.json(results);
                }
            });
        }
    };
})();