var mongoose = require('mongoose');

var League = mongoose.model('League');

module.exports = (function () {
  return {
    createLeague: function (req, res) {
      // console.log("In server LeagueController")
      // console.log(req.body)
      var league = new League({leagueName: req.body.leagueName, team1: req.body.teamName1, team2: req.body.teamName2, team3: req.body.teamName3, team4: req.body.teamName4, team5: req.body.teamName5, team6: req.body.teamName6, team7: req.body.teamName7, team8: req.body.teamName8, team9: req.body.teamName9, team10: req.body.teamName10});
      league.save(function (err, results) {
        if (err) {
          console.log('Error: ' + err);
        }else {
          console.log(results);
          console.log('New League Created!');
        }
      });
    },

    getLeague: function(req, res){
        League.find({}, function(err, results){
            if(err){
                console.log("Error: "+ err);
            }
            else{
                res.json(results);
            }
        });
    },

    clearAll: function(req, res){
        League.remove({}, function(err, results){
            if(err){
                console.log("Error: "+ err);
            }
            else{
                res.json(results);
            }
        });
    },

  };
})();
