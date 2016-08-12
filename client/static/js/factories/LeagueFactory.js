angular.module("LeagueFactory", []).factory("LeagueFactory", function($http){
    var factory = {};

    factory.createLeague = function(newLeague, callback){
        $http.post("/createLeague", newLeague);
    };

    factory.getLeague = function(callback){
        $http.get("/getLeague").success(function(data){
            console.log("Factory"+data);
            callback(data);
        });
    };

    factory.clearAll = function(callback){
        console.log("In Factory");
        $http.post("/clearAll").success(function(data){
            callback(data);
        })
    }

    return factory;
});