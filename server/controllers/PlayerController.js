var mongoose = require("mongoose");

var Draft = mongoose.model("Draft");

module.exports = (function(){
    return{
        getAll: function(req, res){
            console.log("In Player Controller");
            for(x in req.body.Players){
                var player = new Draft({displayName: req.body.Players[x].displayName, position: req.body.Players[x].position, drafted: "False"} );
                player.save(function(err, results){
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log(results);
                        // res.json(results);
                    }
                })
            }
            console.log(req.body.Players[0].displayName);
            // var player = new Draft(req.Player);
            // console.log(player);
        },

        draft: function(req, res){
            var drafted = new Draft(data);
            console.log(drafted);
            console.log("In Server Controller");
            // drafted.save(function(err, results){
            //     if(err){
            //         console.log(err);
            //     }
            //     else{
            //         res.json(results);
            //     }
            // });
        },

        undraft: function(req, res){

        },
    };
})();