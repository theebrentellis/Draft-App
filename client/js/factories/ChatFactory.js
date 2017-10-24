angular.module("ChatFactory", []).factory("ChatFactory", function ($http, $stateParams) {

    var factory = {};

    factory.getChat = ($stateParams) => {

    };

    factory.sendMessage = (message) => {
        $http.post("/league/" + $stateParams.leagueID + "/draft/" + $stateParams.draftID + "/chat", message);
    };

    return factory;
});