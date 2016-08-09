var mongoose = require("mongoose");

var Draft = mongoose.model("Draft");

module.exports = (function(){
    return{
        getAll: function(req, res){
            console.log("In Player Controller");
            for(var x in req.body.Players){
                var player = new Draft({displayName: req.body.Players[x].displayName, position: req.body.Players[x].position, drafted: false} );
                player.save(function(err, results){
                    if(err){
                        console.log("Error: "+err);
                    }
                    else{
                        console.log(results);
                        // res.json(results);
                    }
                });
            };
        },

        getPlayers: function(req, res){
            console.log("In Server Controller getPlayers");
            console.log(req.query.position_select);
            Draft.find({drafted: false, position: req.query.position_select}, function(err, results){
                if(err){
                    console.log("Error: "+err);
                }
                else{
                    console.log(results);
                    res.json(results);
                }
            });
        },

        draftPlayer: function(req, res){
            Draft.update({"_id": req.params._id},{$set:{drafted:true}}, function(err, results){
                if(err){
                    console.log("Error: "+err);
                }
                else{
                    res.json(results);
                }
            });
        },

        getDraftedPlayers: function(req, res){
            console.log("In Server Controller getDraftedPlayers");
            Draft.find({drafted: true}, function(err, results){
                if(err){
                    console.log("Error: "+err);
                }
                else{
                    res.json(results);
                }
            });
        },

        newDraft: function(req, res){
            console.log("In Server Controller");
            Draft.remove({}, function(err, results){
                if(err){
                    console.log("Error: "+err);
                }
                else{
                    console.log(results);
                }
            });
        },
    };
})();