var DraftApp = angular.module("DraftApp", ["ngRoute", "ngMessages", "ngAnimate", "AppController", "AuthenticationService", "LeagueController", "UserController", "PlayerController", "DraftFactory", "FlashFactory", "LeagueFactory", "UserFactory", "ui.router", "ui.bootstrap", "angular-confirm"]);

DraftApp.config(function($stateProvider, $urlRouterProvider){
    
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state("login", {
            url:"/login",
            views: {
                "header":{
                    templateUrl: "/static/partials/app.html",
                    controller: "AppController",
                    controllerAs: "vm",
                },
                "content":{
                    templateUrl: "/static/partials/login.html",
                    controller: "UserController",
                    controllerAs: "vm"
                },
            }
        })
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
                    controller: "AppController",
                    controllerAs: "vm",
                },
                "content": {
                    templateUrl: "/static/partials/availablePlayers.html",
                    controller: "PlayerController",
                    controllerAs: "vm"
                }
            }
        })
        .state("draftBoard", {
            url: "/draftBoard",
            views: {
                "header":{
                    templateUrl: "/static/partials/app.html",
                    controller: "AppController",
                    controllerAs: "vm"
                },
                "content": {
                    templateUrl: "/static/partials/draftBoard.html",
                    controller: "PlayerController",
                    controllerAs: "vm"
                }
            }
        });
});

DraftApp.run(function($rootScope, $location, $route, AuthenticationService){
    $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute){
        if($location.path() === "/availablePlayers" && !AuthenticationService.isLoggedIn()){
            $location.path("/");
        }
    });
    // run();
    // getToken();
    // function run(){
    //     $http.defaults.headers.common["Authorization"] = "Bearer " + $window.jwtToken;

    //     $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams){
    //         $rootScope.activeTab = toState.data.activeTab;
    //     });
    // }
    //  function getToken(){
    //     $http.get("/token", function(token){
    //         window.jwtToken = token;

    //         angular.bootstrap(document, ["DraftApp"]);
    //     });
    // };
});