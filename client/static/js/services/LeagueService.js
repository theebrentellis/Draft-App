angular.module("LeagueService", []).service("LeagueService", function($window, $state, $q, $location, LeagueFactory, ChatFactory, AuthenticationService){
    var service = {};

    var vm = this;

    vm.currentUser = AuthenticationService.currentUser();
    vm.isLoggedIn = AuthenticationService.isLoggedIn();

    var saveCurrentLeagueId = function(leagueId){
        $q.resolve($window.localStorage["current-league-id"] = leagueId);
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

    service.currentLeague = function(){
        var theLeague = JSON.parse($window.localStorage.getItem("current-league"));
        // console.log(theLeague);
        return theLeague;
    };

    service.setCurrentLeagueId = function(leagueId){
        var deferred = $q.defer();
        if(leagueId){
            return $q.when(saveCurrentLeagueId(leagueId));
        }
    };

    service.getCurrentLeagueId = function(){
        if(currentLeagueId){
            return currentLeagueId;
        }
    };

    service.getLeague = function(){
        var theLeague = currentLeagueId();
        return LeagueFactory.getLeague(theLeague)
            .then(function(response){
                saveCurrentLeague(response.data);
                return "Done";
            }, function(error){
                console.log(error);
            });
    };

    service.createNewLeague = function (newLeagueInfo, callback) {
        return LeagueFactory.createLeague(newLeagueInfo)
            .then(function(response){
                AuthenticationService.updateToken(response.data.token);
            }, function(error){
                console.log(error);
            });
    };

    service.joinLeague = function(leagueId, callback){
        var package = {
            "userId": vm.currentUser._id,
            "leagueId": leagueId
        };
        LeagueFactory.joinLeague(package, function(updatedUserToken){
            AuthenticationService.updateToken(updatedUserToken.token);
            $location.path("/availablePlayers");
        });
    };

    service.getAllLeagues = function(callback){
        if(vm.currentUser.leagues[0] === undefined){
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

    service.postMessage = function(message){
        var theLeague = service.currentLeague();

        var chatMessage = {
            "_id": theLeague.chat._id,
            "userName": vm.currentUser.firstName,
            "message": message
        };

        ChatFactory.postMessage(chatMessage, function(result, err){
            if(err){
                console.log(err);
            }
            if(result){
                console.log(result);
            }
        });
    };

    service.deleteAllLeagues = function () {
        LeagueFactory.deleteAllLeagues();
    };

    service.deleteAllChat = function(){
        ChatFactory.deleteAllChat();
    };

    return service;
});