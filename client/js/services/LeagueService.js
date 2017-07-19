angular.module("LeagueService", []).service("LeagueService", function ($window, $state, $stateParams, $q, $location, LeagueFactory, ChatFactory, AuthenticationService) {
    let service = {};
    let vm = this;

    //Current User
    vm.currentUser = {};
    let getCurrentUser = AuthenticationService.currentUser();
    getCurrentUser.then((response) => {
        vm.currentUser = response;
    }, (error) => {
        console.log(error);
    });

    //Current League
    vm.league = {};
    service.getLeague = function() {
        return LeagueFactory.getLeague($stateParams.leagueID)
            .then((response) => {
                if (response.data) {
                    return response.data;
                }
            }, (error) => {
                console.log(error);
            });
    };
    // let getLeague = LeagueService.getLeague();
    // getLeague.then((response) => {
    //     vm.league = response;
    // }, (error) => {
    //     console.log(error);
    //     });
    
    
    service.createNewLeague = function (newLeagueInfo) {
        return LeagueFactory.createLeague(newLeagueInfo)
            .then((response) => {
                return AuthenticationService.updateToken(response.data.token)
                    .then(() => {
                        $state.transitionTo('dashboard');
                    }, (error) => {
                        console.log(error);
                    });
            }, (error) => {
                console.log(error);
            });
    };
    
    service.joinLeague = function (code) {
        let leaguePack = {
            "user_id": vm.currentUser._id,
            "league_code": code
        };
        return LeagueFactory.joinLeague(leaguePack)
            .then((response) => {
                if (response.data.token) {
                    return AuthenticationService.updateToken(response.data.token)
                        .then(() => {
                            return "League Joined";
                        }, (error) => {
                            console.log(error);
                        });
                }
                else {
                    return reponse.message;
                }
            }, (error) => {
                console.log(error);
            });
    };


    // vm.isLoggedIn = AuthenticationService.isLoggedIn();

    // var saveCurrentLeagueId = function (leagueId) {
    //     $q.resolve($window.localStorage["current-league-id"] = leagueId);
    // };

    // var currentLeagueId = function () {
    //     if ($window.localStorage["current-league-id"]) {
    //         return $window.localStorage["current-league-id"];
    //     }
    //     else {
    //         return false;
    //     }
    // };

    // var saveCurrentLeague = function (league) {
    //     if ($window.localStorage["current-league"]) {
    //         $window.localStorage.removeItem("current-league");
    //         $window.localStorage.setItem("current-league", JSON.stringify(league));
    //     }
    //     else {
    //         $window.localStorage.setItem("current-league", JSON.stringify(league));
    //     }
    // };

    // service.currentLeague = function () {
    //     var theLeague = JSON.parse($window.localStorage.getItem("current-league"));
    //     return theLeague;
    // };

    // service.setCurrentLeagueId = function (leagueId) {
    //     if (leagueId) {
    //         return $q.when(saveCurrentLeagueId(leagueId));
    //     }
    // };

    // service.getCurrentLeagueId = function () {
    //     if (currentLeagueId) {
    //         return currentLeagueId;
    //     }
    // };

    

    

    

    service.postMessage = function (message) {
        var theLeague = service.currentLeague();

        var chatMessage = {
            "_id": theLeague.chat._id,
            "userName": vm.currentUser.firstName,
            "message": message
        };

        ChatFactory.postMessage(chatMessage, function (result, err) {
            if (err) {
                console.log(err);
            }
            if (result) {
                console.log(result);
            }
        });
    };

    service.deleteAllLeagues = function () {
        LeagueFactory.deleteAllLeagues();
    };

    service.deleteAllChat = function () {
        ChatFactory.deleteAllChat();
    };

    return service;
});