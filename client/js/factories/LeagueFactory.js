angular.module("LeagueFactory", []).factory("LeagueFactory", function($http){
    var factory = {};

    factory.createLeague = function (newLeagueInfo) {
        return $http.post("/createLeague", newLeagueInfo)
            .then(function(response){
                console.log(response);
                return response;
            }, function(error){
                console.log(error);
                return error;
            });
    };

    factory.getLeague = function(leagueId){
        return $http.get("/getLeague/", {params: {_id: leagueId}})
            .then(function(data){
                return data;
            }, function(error){
                console.log(error);
            });
    };

    factory.getAllLeagues = function(){
        return $http.get("/getAllLeagues")
            .then(function(response){
                return response.data;
            }, function(error){
                console.log(error);
            });
    };

    factory.joinLeague = function(user){
        return $http.patch("/joinLeague/", user)
            .then(function(response){
                return response.data.token;
            }, function(error){
                console.log(error);
            });
    };

    factory.deleteAllLeagues = function(){
        return $http.post("/leaguesClearAll")
            .then(function(response){
            }, function(error){
                console.log(error);
            });
        // .success(function(data){
        //     console.log(data);
        // });
    };

    return factory;
});