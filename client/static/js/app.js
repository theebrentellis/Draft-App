var DraftApp = angular.module("DraftApp", ["ngRoute", "ngMessages", "PlayerController", "DraftFactory"]);

DraftApp.config(function($routeProvider){
    $routeProvider
    .when("/", {
        templateUrl: "/client/index.html"
    });
});