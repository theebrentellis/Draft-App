angular.module('DraftService', []).service('DraftService', function ($http, $window, $state, LeagueFactory, DraftFactory, AuthenticationService) {
    var service = {};

    var vm = this;

    vm.currentUser = AuthenticationService.currentUser();

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
            console.log(leagueId);
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
        if(currentLeagueId() === false){
            console.log("In service.getLeague false statement");
        }
        else{
            console.log("Error in service.getleague");
            
        }
        
    };

    service.createNewLeague = function (newLeagueInfo, callback) {
        LeagueFactory.createLeague(newLeagueInfo, function (token) {
            AuthenticationService.updateToken(token);
            // var workingLeagueId = vm.currentUser.leagues[0]._id;
            // saveCurrentLeagueId(workingLeagueId);
            // callback("Success");
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
            console.log(vm.currentUser.leagues[0]);
        });
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