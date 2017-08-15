angular.module("DraftFactory", []).factory("DraftFactory", function ($http, $stateParams) {
    var factory = {};

    factory.startDraft = (newDraftObject) => {
        return $http.post("/league/" + $stateParams.leagueID + "/draft/new", newDraftObject)
            .then((response) => {
                return response;
            }, (error) => {
                console.log(error);
            });
    };

    factory.getDraft = ($stateParams) => {
        return $http.get("/league/" + $stateParams.leagueID + "/draft/" + $stateParams.draftID + "/get")
            .then((response) => {
                return response;
            }, (error) => {
                console.log(error);
            });
    };

    factory.downloadPlayers = () => {
        return $http.post("/downloadPlayers").then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        });
    };

    factory.draftPlayer = (draftPick) => {
        return $http.post("/league/" + $stateParams.leagueID + "/draft/" + $stateParams.draftID + "/position/" + draftPick.position + "/player/" + draftPick.player_id)
            .then((response) => {
                return response;
            }, (error) => {
                console.log(error);
            });
    };

    return factory;
});