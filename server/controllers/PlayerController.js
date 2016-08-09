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
                        console.log(err);
                    }
                    else{
                        console.log(results);
                        // res.json(results);
                    }
                });
            }
        },

        getPlayers: function(req, res){
            console.log("In Server Controller");
            //console.log(req.body.position_select);
            Draft.find({drafted: false, position:"DEF"}, function(err, results){
                if(err){
                    console.log("Error: "+err);
                }
                else{
                    res.json(results);
                    // res.json(results);
                }
            });
        },

        draftPlayer: function(req, res){
            Draft.update({_id: req.params.id},{drafted:true}, function(err, results){
                if(err){
                    console.log("Error: "+err);
                }
                else{
                    console.log(results);
                }
            });
        },

        getDraftedPlayers: function(req, res){
            Draft.find({drafted: true}, function(err, results){
                if(err){
                    console.log(err);
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
                    console.log(err);
                }
                else{
                    console.log(results);
                }
            });
        },
    };
})();