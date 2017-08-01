angular.module("LeagueFactory", []).factory("LeagueFactory", function ($http, $stateParams) {
    let factory = {};

    factory.createLeague = (newLeagueInfo) => {
        return $http.post("/createLeague", newLeagueInfo)
            .then((response) => {
                return response;
            }, (error) => {
                console.log(error);
            });
    };

    factory.joinLeague = (leaguePack) => {
        return $http.patch("/joinLeague/", leaguePack)
            .then(function (response) {
                return response;
            }, function (error) {
                console.log(error);
            });
    };

    factory.getLeague = (id) => {
        return $http.get("/getLeague/", { params: { _id: id } })
            .then((response) => {
                return response;
            }, (error) => {
                console.log(error);
            });
    };
    
    factory.newLeagueMessage = (messagePack) => {
        return $http.post('/league/newMessage', messagePack)
            .then((response) => {
                return response
            }, (error) => {
                console.log(error);
            });
    };
    
    factory.updateTeamPick = (pickPack) => {
        return $http.post('/league/' + $stateParams.leagueID, pickPack)
            .then((response) => {
                return response;
            }, (error) => {
                console.log(error);
            });
    };
    
    factory.deleteLeagueTeam = (team) => {
        console.log(team);
        return $http.post("/league/" + $stateParams.leagueID + "/deleteLeagueTeam", team)
            .then((response) => {
                return response;
            }, (error) => {
                console.log(error);
            });
    };
    
    factory.getUserLeagues = (user_id) => {
        return $http.get('/leagues/user/' + user_id)
            .then((response) => {
                return response;
            }, (error) => {
                console.log(error);
            });
    };

    return factory;
});