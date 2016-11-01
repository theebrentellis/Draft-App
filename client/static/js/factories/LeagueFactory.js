angular.module("LeagueFactory", []).factory("LeagueFactory", function($http){
    var factory = {};

    factory.createLeague = function(newLeagueInfo, callback){
        $http.post("/createLeague", newLeagueInfo).success(function(data){
            callback(data);
        });
    };

    factory.getLeague = function(leagueId, callback){
        $http.get("/getLeague/", {params: {_id: leagueId}}).success(function(data){
            callback(data);
        });
    };

    factory.getAllLeagues = function(callback){
        $http.get("/getAllLeagues").success(function(leagues){
            callback(leagues);
        });
    };

    factory.joinLeague = function(package, callback){
        $http.patch("/joinLeague/", package).success(function(status){
            callback(status);
        });
    };

    factory.leaguesClearAll = function(callback){
        $http.post("/leaguesClearAll").success(function(data){
            console.log(data);
        });
    };

    return factory;
});