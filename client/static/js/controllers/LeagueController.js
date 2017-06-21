angular.module('LeagueController', []).controller('LeagueController', function ($scope, $q, $confirm, $location, AuthenticationService, LeagueService) {
    
    var vm = this;

    vm.allLeagues = [];

    vm.currentUser = AuthenticationService.currentUser();

    vm.currentLeague = LeagueService.currentLeague();

    vm.createNewLeagueView = false;
    vm.findLeagueView = false;

    var getAllLeagues = function(){
        return LeagueService.getAllLeagues()
            .then(function(leagues){
                vm.allLeagues = leagues;
            }, function(error){
                console.log(error);
            });
    };

    // var getUserLeague = function(id){
    //     LeagueService.getUserLeague(id, function(league){
    //     });
    // };

    vm.leagueViewChange = function(view){
        if(view === "createNew"){
            vm.createNewLeagueView = true;
            vm.findLeagueView = false;
        }
        if(view === "findLeague"){
            return getAllLeagues()
                .then(function(){
                    vm.findLeagueView = true;
                    vm.createNewLeagueView = false;
                }, function(error){
                    console.log(error);
                });
            
            
        }
    };

    vm.createNewLeague = function(){
        var newLeagueInfo = {
            "leagueName": vm.newLeague.leagueName,
            "userId": vm.currentUser._id
        };
        LeagueService.createNewLeague(newLeagueInfo);
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