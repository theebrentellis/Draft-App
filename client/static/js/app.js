var DraftApp = angular.module("DraftApp", ["ngRoute", "ngMessages", "AppController", "PlayerController", "DraftFactory", "ui.router"]);

DraftApp.config(function($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider){
    
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state("home", {
            url: "/",
            views: {
                "header":{
                    templateUrl: "/static/partials/app.html",
                    controller: "AppController"
                }
            }
        })
        .state("commish", {
            url: "/commish",
            views: {
                "header":{
                    templateUrl: "/static/partials/app.html",
                    controller: "AppController"
                },
                "content":{
                    templateUrl: "/static/partials/commish.html",
                    controller: "PlayerController"
                }
            }
        })
        .state("availablePlayers", {
            url: "/availablePlayers",
            views: {
                "header":{
                    templateUrl: "/static/partials/app.html",
                    controller: "AppController"
                },
                "content": {
                    templateUrl: "/static/partials/availablePlayers.html",
                    controller: "PlayerController"
                }
            }
        })
        .state("draftBoard", {
            url: "/draftBoard",
            views: {
                "header":{
                    templateUrl: "/static/partials/app.html",
                    controller: "AppController"
                },
                "content": {
                    templateUrl: "/static/partials/draftBoard.html",
                    controller: "PlayerController"
                }
            }
        });
    // $routeProvider
    // .when("/", {
    //     templateUrl: "/client/index.html",
    //     controller: "AppController"
    // })
    // .when("/commish", {
    //     templateUrl: "/static/partials/commish.html",
    //     controller: "PlayerController"
    // })
    // .when("/availablePlayers", {
    //     templateUrl: "/static/partials/availablePlayers.html",
    //     controller: "PlayerController"
    // })
    // .when("/draftBoard", {
    //     templateUrl: "/static/partials/draftBoard.html",
    //     controller: "PlayerController"
    // })
    // .otherwise({
	// 	redirectTo: '/'
	// });

    $locationProvider.html5Mode(true);
});
