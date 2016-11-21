angular.module("DraftFactory", []).factory("DraftFactory", function($http, $q){
    var factory = {};

    var drafted = [];

    // factory.getAll = function(data){
    //     $http.post("/getAll", data);
    // };

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

    factory.newDraft = function(callback){
        $http.post("/newDraft").success(function(output){
            callback(output);
        });
    };

    return factory;
});