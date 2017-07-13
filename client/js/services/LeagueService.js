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
        return theLeague;
    };

    service.setCurrentLeagueId = function(leagueId){
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
                $q.resolve(saveCurrentLeague(response.data))
                    .then(function(){
                        return "Done";
                    }, function(error){
                        console.log(error);
                    });
            }, function(error){
                console.log(error);
            });
    };

    service.createNewLeague = function (newLeagueInfo) {
        return LeagueFactory.createLeague(newLeagueInfo)
            .then(function (response) {
                console.log(response);
                $q.when(AuthenticationService.updateToken(response.data.token))
                    .then(function () {
                        $state.transitionTo('dashboard');
                        // currentUser = AuthenticationService.currentUser();
                        // $q.when(service.setCurrentLeagueId(currentUser.leagues[0]._id))
                        //     .then(function(){
                        //         $q.when(service.getLeague())
                        //             .then(function(response){
                        //                 $location.path("/availablePlayers");
                        //                 return response;
                        //             }, function(error){
                        //                 console.log(error);
                        //             });
                        //     }, function(error){
                        //         console.log(error);
                        //     });
                    }, function(error){
                        console.log(error);
                    });
            }, function(error){
                console.log(error);
            });
    };

    service.joinLeague = function(leagueId){
        currentUser = AuthenticationService.currentUser();
        var user = {
            "userId": currentUser._id,
            "leagueId": leagueId
        };
        return LeagueFactory.joinLeague(user)
            .then(function(updateToken){
                $q.when(AuthenticationService.updateToken(updateToken))
                    .then(function(){
                        updatedCurrentUser = AuthenticationService.currentUser();
                        $q.when(service.setCurrentLeagueId(updatedCurrentUser.leagues[0]._id))
                            .then(function(){
                                $q.when(service.getLeague())
                                    .then(function(){
                                        $location.path("/availablePlayers");
                                    }, function(error){
                                        console.log(error);
                                    });
                            }, function(error){
                                console.log(error);
                            });
                    }, function(error){
                        console.log(error);
                    });
            }, function(error){
                console.log(error);
            });
    };

    service.getAllLeagues = function(){
        currentUser = AuthenticationService.currentUser();
        if(currentUser.leagues[0] === undefined){
            return LeagueFactory.getAllLeagues()
                .then(function(leagues){
                    return leagues;
                }, function(error){
                    console.log(error);
                });
        }
        else{
            return LeagueFactory.getAllLeagues()
                .then(function(leagues){
                    for(var x in leagues){
                        for(var y in currentUser.leagues){
                            if(leagues[x]._id == currentUser.leagues[y]._id){
                                leagues.splice(x, 1);
                            }
                        }
                    }
                    return leagues;
                }, function(error){
                    console.log(error);
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