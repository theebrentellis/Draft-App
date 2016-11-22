angular.module("DraftFactory", []).factory("DraftFactory", function($http, $q){
    var factory = {};

    factory.downloadPlayers = function(){
        $http.post("/downloadPlayers").success(function(data){
            console.log(data);
        });
    };

    factory.getPlayers = function(position, callback){
        $http.get("/getPlayers/", {params: {position: position}}).success(function(output){
            callback(output);
        });
    };

    factory.deleteAllPlayers = function(callback){
        $http.post("/deleteAllPlayers").success(function(data){
            callback(data);
        });
    };

    factory.draftPlayer = function(draftPackage){
        return $http.post("/draftPlayer", draftPackage)
            .then(function(response){
                return response;
            }, function(error){
                console.log(error);
            });
    };

    factory.getDraftedPlayers = function(callback){
        $http.get("/getDraftedPlayers").success(function(output){
            callback(output);
        });
    };

    factory.deleteAllDrafts = function(){
        return $http.post("/deleteAllDrafts");
    };

    return factory;
});