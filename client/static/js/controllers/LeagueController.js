angular.module('LeagueController', []).controller('LeagueController', function ($scope, $confirm, $location, AuthenticationService, LeagueService) {
    
    var vm = this;

    vm.allLeagues = [];

    vm.currentUser = AuthenticationService.currentUser();

    vm.currentLeague = LeagueService.currentLeague();

    vm.createNewLeagueView = false;
    vm.findLeagueView = false;

    var getAllLeagues = function(){
        LeagueService.getAllLeagues(function(leagues){
            vm.allLeagues = leagues;
        });
    };

    var getUserLeague = function(id){
        LeagueService.getUserLeague(id, function(league){
        });
    };

    vm.leagueViewChange = function(view){
        if(view === "createNew"){
            vm.createNewLeagueView = true;
            vm.findLeagueView = false;
        }
        if(view === "findLeague"){
            vm.findLeagueView = true;
            vm.createNewLeagueView = false;
            getAllLeagues();
        }
    };

    vm.createNewLeague = function(){
        var newLeagueInfo = {
            "leagueName": vm.newLeague.leagueName,
            "userId": vm.currentUser._id
        };
        return LeagueService.createNewLeague(newLeagueInfo)
        .then(function(){
            $location.path("/availablePlayers");
        }, function(error){
            console.log(error);
        });
    };

    vm.joinLeague = function(leagueId, callback){
        LeagueService.joinLeague(leagueId, function(status){
            if(status == "Success"){
                console.log("Success!");
            }
            else{
                console.log("Error");
            }
        });
    };

});