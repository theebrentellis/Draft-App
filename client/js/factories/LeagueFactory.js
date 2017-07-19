angular.module("LeagueFactory", []).factory("LeagueFactory", function ($http) {
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

    return factory;
});