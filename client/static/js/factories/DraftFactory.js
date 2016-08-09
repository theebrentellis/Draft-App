angular.module("DraftFactory", []).factory("DraftFactory", function($http){
    var factory = {};

    var drafted = [];

    factory.getAll = function(data){
        $http.post("/getAll", data);
    };

    factory.getPlayers = function(position, callback){
        $http.get("/getPlayers", position).success(function(output){
            callback(output);
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

    factory.newDraft = function(){
        $http.post("/newDraft");
    };
    return factory;
});