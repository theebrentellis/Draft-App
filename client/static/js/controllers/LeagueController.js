angular.module('LeagueController', []).controller('LeagueController', function ($scope, $confirm, $location, AuthenticationService, DraftService) {
    
    $scope.allLeagues = [];

    var vm = this;

    vm.currentUser = AuthenticationService.currentUser();

    vm.currentLeague = DraftService.currentLeague();

    $scope.createNewLeagueView = false;
    $scope.findLeagueView = false;

    $scope.leagueViewChange = function(view){
        if(view === "createNew"){
            $scope.createNewLeagueView = true;
            $scope.findLeagueView = false;
        }
        if(view === "findLeague"){
            $scope.findLeagueView = true;
            $scope.createNewLeagueView = false;
            getAllLeagues();
        }
        else{
            console.log("View Change Error");
        }
    };


    $scope.createNewLeague = function(){
        var newLeagueInfo = {
            "leagueName": $scope.newLeague.leagueName,
            "userId": vm.currentUser._id
        };
        DraftService.createNewLeague(newLeagueInfo, function(updatedUserToken){
            AuthenticationService.updateToken(updatedUserToken);
        });
        $location.path("/availablePlayers");
    };

    var getAllLeagues = function(){
        DraftService.getAllLeagues(function(leagues){
            $scope.allLeagues = leagues;
        });
    };

    $scope.joinLeague = function(leagueId, callback){
        DraftService.joinLeague(leagueId, function(status){
            if(status == "Success"){
                console.log("Success!");
            }
            else{
                console.log("Error");
            }
        });
    };

    var getUserLeague = function(id){
        DraftService.getUserLeague(id, function(league){
        });
    };
});