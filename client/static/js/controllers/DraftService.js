angular.module('DraftService', []).service('DraftService', function ($http, $window, $state, LeagueFactory, DraftFactory, AuthenticationService) {
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
            $state.reload();
        }
        else{
            $window.localStorage.setItem("current-league", JSON.stringify(league));
            $state.reload();
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
        if(vm.currentUser.leagues[0] == false){
            LeagueFactory.getAllLeagues(function(leagues){
                callback(leagues);
            });
        }
        else{
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

    service.downloadPlayers = function () {
        var position = ['QB', 'RB', 'WR', 'TE', 'K', 'DEF'];
        for (var x in position) {
            $http.get('http://www.fantasyfootballnerd.com/service/players/json/rtj7893jmh8t/' + position[x]).success(function (data) {
                    DraftFactory.getAll(data);
                }).success(function () {
                    console.log("Success!!");
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        }
    };

    service.leaguesClearAll = function () {
        LeagueFactory.leaguesClearAll();
    };

    service.deleteAllChat = function(){
        ChatFactory.deleteAllChat();
    };

    service.deleteAllPlayers = function(){

    };

    service.undraftedPlayers = function () {

    };

    service.draftedPlayers = function () {

    };

    return service;
});