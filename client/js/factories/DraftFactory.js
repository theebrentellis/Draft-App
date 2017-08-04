angular.module("DraftFactory", []).factory("DraftFactory", function($http, $stateParams){
    var factory = {};

    factory.startDraft = (newDraftObject) => {
        return $http.post("/league/" + $stateParams.leagueID + "/draft/new", newDraftObject)
            .then((response) => {
                return response;
            }, (error) => {
                console.log(error);
            });
    };
    
    factory.getDraft = () => {
        return $http.get("/league/" + $stateParams.leagueID + "/draft/" + $stateParams.draftID + "/get")
    };

    factory.downloadPlayers = () => {
        return $http.post("/downloadPlayers").then((response)=>{
            console.log(response);
        }, (error) => {
            console.log(error);
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

    factory.draftPlayer = function (draftPick) {
        return $http.post("/league/" + $stateParams.leagueID + "/draft/" + $stateParams.draftID + "/position/" + draftPick.position + "/player/" + draftPick.player_id)
            .then(function (response) {
                console.log(response);
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

    return factory;
});