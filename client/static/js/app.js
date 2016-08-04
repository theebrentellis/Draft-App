var DraftApp = angular.module("DraftApp", ["ngRoute", "ngMessages", "PlayerController", "PlayerFactory"]);

DraftApp.config(function($routeProvider){
    $routeProvider
    .when("/", {
        templateUrl: "/client/index.html"
    });
});