angular.module("DraftFactory", []).factory("DraftFactory", function($http){
    var factory = {};

    var drafted = [];

    factory.getAll = function(data){
        $http.post("/getAll", data);
    };

    factory.getPlayers = function(position, callback){
        $http.get("/getPlayers/", {params: position}).success(function(output){
            callback(output);
        });
    };

    factory.deleteAllPlayers = function(callback){
        $http.post("/deleteAllPlayers").success(function(data){
            callback(data);
        });
    };

    factory.draftPlayer = function(id, callback){
        $http.patch("/draftPlayer/"+id).success(function(output){
            callback(output);
        });
    };

    factory.getDraftedPlayers = function(callback){
        $http.get("/getDraftedPlayers").success(function(output){
            callback(output);
        });
    };

    factory.newDraft = function(callback){
        $http.post("/newDraft").success(function(output){
            callback(output);
        });
    };

    return factory;
});