angular.module("LeagueFactory", []).factory("LeagueFactory", function($http){
    var factory = {};

    factory.createLeague = function(newLeague, callback){
        $http.post("/createLeague", newLeague)
    };
    return factory;
});