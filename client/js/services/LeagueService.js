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
    
    service.joinLeague = function (joinPac) {
        return LeagueFactory.joinLeague(joinPac)
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
                    return response.data.message;
                }
            }, (error) => {
                console.log(error);
            });
    };

    service.postMessage = () => {
        var theLeague = service.currentLeague();

        var chatMessage = {
            "_id": theLeague.chat._id,
            "userName": vm.currentUser.firstName,
            "message": message
        };

        // ChatFactory.postMessage(chatMessage, function (result, err) {
        //     if (err) {
        //         console.log(err);
        //     }
        //     if (result) {
        //         console.log(result);
        //     }
        // });
    };

    service.deleteAllLeagues = function () {
        LeagueFactory.deleteAllLeagues();
    };

    service.deleteAllChat = function () {
        ChatFactory.deleteAllChat();
    };

    return service;
});