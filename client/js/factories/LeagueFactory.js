angular.module("LeagueFactory", []).factory("LeagueFactory", function ($http) {
    let factory = {};

    factory.createLeague = function (newLeagueInfo) {
        return $http.post("/createLeague", newLeagueInfo)
            .then(function (response) {
                console.log(response);
                return response;
            }, function (error) {
                console.log(error);
                return error;
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

    factory.getAllLeagues = function () {
        return $http.get("/getAllLeagues")
            .then(function (response) {
                return response.data;
            }, function (error) {
                console.log(error);
            });
    };

    factory.joinLeague = function (leaguePack) {
        return $http.patch("/joinLeague/", leaguePack)
            .then(function (response) {
                return response;
            }, function (error) {
                console.log(error);
            });
    };

    factory.deleteAllLeagues = function () {
        return $http.post("/leaguesClearAll")
            .then(function (response) {
            }, function (error) {
                console.log(error);
            });
        // .success(function(data){
        //     console.log(data);
        // });
    };

    return factory;
});