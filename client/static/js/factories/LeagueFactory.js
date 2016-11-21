angular.module("LeagueFactory", []).factory("LeagueFactory", function($http){
    var factory = {};

    factory.createLeague = function(newLeagueInfo, callback){
        return $http.post("/createLeague", newLeagueInfo)
            .then(function(token){
                return token;
            }, function(error){
                console.log(error);
                return error;
            });
    };

    factory.getLeague = function(leagueId, callback){
        return $http.get("/getLeague/", {params: {_id: leagueId}})
            .then(function(data){
                return data;
            }, function(error){
                console.log(error);
            });
    };

    factory.getAllLeagues = function(callback){
        $http.get("/getAllLeagues").success(function(leagues){
            console.log(leagues);
            callback(leagues);
        });
    };

    factory.joinLeague = function(package, callback){
        $http.patch("/joinLeague/", package).success(function(status){
            callback(status);
        });
    };

    factory.deleteAllLeagues = function(callback){
        $http.post("/leaguesClearAll").success(function(data){
            console.log(data);
        });
    };

    return factory;
});