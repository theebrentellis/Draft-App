angular.module("LeagueFactory", []).factory("LeagueFactory", function($http){
    var factory = {};

    factory.createLeague = function(newLeague, callback){
        $http.post("/createLeague", newLeague);
    };

    factory.getLeague = function(callback){
        $http.get("/getLeague").success(function(data){
            callback(data);
        });
    };

    factory.clearAll = function(callback){
        $http.post("/clearAll").success(function(data){
            callback(data);
        });
    };

    return factory;
});