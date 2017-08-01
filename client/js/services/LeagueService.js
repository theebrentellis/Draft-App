angular.module("LeagueService", []).service("LeagueService", function ($window, $state, $stateParams, $q, $location, LeagueFactory, AuthenticationService) {
    let service = {};

    let deferred = $q.defer();

    //Current User
    let currentUser = {};
    let getCurrentUser = AuthenticationService.currentUser();
    getCurrentUser.then((response) => {
        currentUser = response;
    }, (error) => {
        console.log(error);
    });

    //Current League
    let currentLeague = {};
    service.getLeague = () => {
        if ($stateParams.leagueID) {
            return LeagueFactory.getLeague($stateParams.leagueID)
                .then((response) => {
                    if (response.data) {
                        currentLeague = response.data;
                        return response.data;
                    }
                }, (error) => {
                    console.log(error);
                });
        }

    };

    service.createNewLeague = function (newLeagueInfo) {
        return LeagueFactory.createLeague(newLeagueInfo)
            .then((response) => {
                return response;
                // return AuthenticationService.updateToken(response.data.token)
                //     .then(() => {
                //         $state.transitionTo('dashboard');
                //     }, (error) => {
                //         console.log(error);
                //     });
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

    service.newLeagueMessage = (messagePack) => {
        return LeagueFactory.newLeagueMessage(messagePack)
            .then((response) => {
                return response;
            }, (error) => {
                console.log(error);
            });
    };

    service.updateTeamPick = (pickPack) => {
        return LeagueFactory.updateTeamPick(pickPack)
            .then((response) => {
                return response;
            }, (error) => {
                console.log(error);
            });
    };

    service.deleteLeagueTeam = (team) => {
        return LeagueFactory.deleteLeagueTeam(team)
            .then((response) => {
                return response;
            }, (error) => {
                console.log(error);
            });
    }

    service.isCommish = (id) => {

    };

    service.getUserLeagues = (id) => {
        return LeagueFactory.getUserLeagues(id)
            .then((response) => {
                return response;
            }, (error) => {
                console.log(error);
            });
    };

    return service;
});