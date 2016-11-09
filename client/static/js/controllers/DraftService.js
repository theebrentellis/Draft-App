angular.module('DraftService', []).service('DraftService', function ($window, $state, LeagueFactory, DraftFactory, AuthenticationService) {
    var service = {};

    var vm = this;

    vm.currentUser = AuthenticationService.currentUser();
    vm.isLoggedIn = AuthenticationService.isLoggedIn();

    var saveCurrentLeagueId = function(leagueId){
        $window.localStorage["current-league-id"] = leagueId;
    };

    var currentLeagueId = function(){
        if($window.localStorage["current-league-id"]){
            return $window.localStorage["current-league-id"];
        }
        else{
            return false;
        }  
    };

    var saveCurrentLeague = function(league){
        if($window.localStorage["current-league"]){
            $window.localStorage.removeItem("current-league");
            $window.localStorage.setItem("current-league", JSON.stringify(league));
        }
        else{
            $window.localStorage.setItem("current-league", JSON.stringify(league));
        }
    };

    var getCurrentLeague = function(){
        league = $window.localStorage.getItem("current-league");
        league = JSON.parse(league);
        return league;
    };

    service.setCurrentLeagueId = function(leagueId){
        if(leagueId){
            saveCurrentLeagueId(leagueId);
        }
    };

    service.getCurrentLeagueId = function(){
        if(currentLeagueId){
            return currentLeagueId;
        }
    };

    service.currentLeague = function(){
        league = getCurrentLeague();
        return league;
    };

    service.getLeague = function(){
        if($window.localStorage["current-league-id"]){
            var theLeague = $window.localStorage["current-league-id"];
            LeagueFactory.getLeague(theLeague, function(league){
            if(league){
                saveCurrentLeague(league);
            }
        });
        }
        if(!$window.localStorage["current-league-id"]){
            console.log("In service.getLeague false statement");
        }
        else{
            console.log("Error in service.getleague");    
        }      
    };

    service.createNewLeague = function (newLeagueInfo, callback) {
        LeagueFactory.createLeague(newLeagueInfo, function (token) {
            AuthenticationService.updateToken(token);
            console.log(vm.currentUser);
        });
    };

    service.getAllLeagues = function(callback){
        if(vm.currentUser.leagues[0] === undefined){
            console.log("In If");
            LeagueFactory.getAllLeagues(function(leagues){
                callback(leagues);
            });
        }
        else{
            console.log("In Else");
            LeagueFactory.getAllLeagues(function(leagues){
            for(var x in leagues){
                for(var y in vm.currentUser.leagues){
                    if(leagues[x]._id == vm.currentUser.leagues[y]._id){
                        leagues.splice(x, 1);
                    }
                }
            }
            callback(leagues);
            });
        }   
    };

    service.joinLeague = function(leagueId, callback){
        var package = {
            "userId": vm.currentUser._id,
            "leagueId": leagueId
        };
        LeagueFactory.joinLeague(package, function(updatedUserToken){
            AuthenticationService.updateToken(updatedUserToken);
        });
    };

    service.defaultCurrentLeague = function(){
        if(vm.isLoggedIn !== false && vm.currentUser.leagues !== undefined){
            console.log(vm.currentUser.firstName);
        //  && vm.currentLeague !== undefined

            // defaultLeague = vm.currentUser.leagues[0]._id;
            // saveCurrentLeagueId(defaultLeague);
            // service.getLeague();
            console.log("Done!");
      } 
    };

    service.isOnClock = function(){
        onClock = getCurrentLeague();
        if(onClock.onClock === vm.currentUser._id){
            return true;
        }
        else{
            return false;
        }
    };

    service.draftPlayer = function(id){
        if(isOnClock){
            
        }
    };

    service.downloadPlayers = function(){
        DraftFactory.downloadPlayers();
    };

    service.leaguesClearAll = function () {
        LeagueFactory.leaguesClearAll();
    };

    service.deleteAllChat = function(){
        ChatFactory.deleteAllChat();
    };

    service.deleteAllPlayers = function(callback){
        DraftFactory.deleteAllPlayers(function(data){
            callback(data);
        });
    };

    service.undraftedPlayers = function () {

    };

    service.draftedPlayers = function () {

    };

    return service;
});