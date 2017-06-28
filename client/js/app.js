let DraftApp = angular.module("DraftApp", ["ngRoute", "ngMessages", "ngAnimate", "ui.router", "ui.bootstrap", "angular-confirm", "AppController", "AuthenticationService", "ChatController", "DraftService", "LeagueController", "LeagueService", "PlayerController", "UserController", "ChatFactory", "DraftFactory", "LeagueFactory", "UserFactory"]);

DraftApp.config(function($stateProvider, $urlRouterProvider){
    
    $urlRouterProvider.otherwise("/dashboard");

    $stateProvider
        .state("welcome", {
            url: "/",
            views: {
                // "header":{
                //     templateUrl: "/partials/app.html",
                //     controller: "AppController",
                //     controllerAs: "vm"
                // },
                "content": {
                    templateUrl: "/partials/welcome.html",
                    controller: "AppController",
                    controllerAs: "vm"
                }
            }
        })
        .state("login", {
            url:"/login",
            views: {
                "header":{
                    templateUrl: "/partials/app.html",
                    controller: "AppController",
                    controllerAs: "vm",
                },
                "content":{
                    templateUrl: "/partials/login.html",
                    controller: "UserController",
                    controllerAs: "vm"
                },
            }
        })
        .state('register', {
            url: "/register",
            views: {
                "header": {
                    templateUrl: "/partials/app.html",
                    controller: "AppController",
                    controllerAs: 'vm'
                },
                "content": {
                    templateUrl: '/partials/register.html',
                    controller: "UserController",
                    controllerAs: "vm"
                }
            }
        })
        .state("dashboard", {
            url: "/dashboard",
            views: {
                "header": {
                    templateUrl: "/partials/app.html",
                    controller: "AppController",
                    controllerAs: 'vm'
                },
                "content": {
                    templateUrl: '/partials/dashboard.html',
                    controller: "UserController",
                    controllerAs: "vm"
                }
            }
        })
        .state("commish", {
            url: "/commish",
            views: {
                "header":{
                    templateUrl: "/partials/app.html",
                    controller: "AppController",
                    controllerAs: "vm"
                },
                "content":{
                    templateUrl: "/partials/commish.html",
                    controller: "LeagueController",
                    controllerAs: "vm",
                    authenticate: true,
                }
            }
        })
        .state("availablePlayers", {
            url: "/availablePlayers",
            views: {
                "header":{
                    templateUrl: "/partials/app.html",
                    controller: "AppController",
                    controllerAs: "vm",
                },
                "content": {
                    templateUrl: "/partials/availablePlayers.html",
                    controller: "PlayerController",
                    controllerAs: "vm",
                    authenticate: true,
                }
            }
        })
        .state("draftBoard", {
            url: "/draftBoard",
            views: {
                "header":{
                    templateUrl: "/partials/app.html",
                    controller: "AppController",
                    controllerAs: "vm"
                },
                "content": {
                    templateUrl: "/partials/draftBoard.html",
                    controller: "PlayerController",
                    controllerAs: "vm",
                    authenticate: true
                }
            }
        })
        .state("chatroom", {
            url: "/chat",
            views: {
                "header":{
                    templateUrl: "/partials/app.html",
                    controller: "AppController",
                    controllerAs: "vm"
                },
                "content": {
                    templateUrl: "/partials/chat.html",
                    controller: "ChatController",
                    controllerAs: "vm",
                    authenticate: true
                }
            }
        });
});

DraftApp.run(function($rootScope, $state, AuthenticationService){
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
        if(toState.authenticate && !AuthenticationService.isLoggedIn()){
            $location.path("/login");
        }
    });
});