var mongoose = require("mongoose");

var Draft = mongoose.model("Draft");

module.exports = (function(){
    return{
        getAll: function(req, res){
            Draft.find({}, function(err, results){
                if(err){
                    console.log(err);
                }
                else{
                    res.json(results);
                }
            });

        },

        draft: function(req, res){
            var drafted = new Draft({player_name: req.body.player_name, player_position: req.body.player_position, draft_team: req.body.draft_team});
            drafted.save(function(err, results){
                if(err){
                    console.log(err);
                }
                else{
                    res.json(results);
                }
            });
        },

        undraft: function(req, res){

        },
    };
})();