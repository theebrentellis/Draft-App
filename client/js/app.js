let DraftApp = angular.module("DraftApp", ["ngRoute", "ngMessages", "ngAnimate", "ui.router", "ui.bootstrap", "angular-confirm", "AppController", "AuthenticationService", "ChatController", "DashboardController", "DraftService", "LeagueController", "LeagueService", "PlayerController", "UserController", "ChatFactory", "DraftFactory", "LeagueFactory", "UserFactory"]);

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
                    // templateUrl: "/partials/welcome.html",
                    templateProvider: ($templateCache) => {
                        return $templateCache.get('welcome.html');
                    },
                    controller: "AppController",
                    controllerAs: "vm"
                }
            }
        })
        .state("login", {
            url:"/login",
            views: {
                "header": {
                    templateProvider: ($templateCache) => {
                        return $templateCache.get('app.html');
                    },
                    // templateUrl: "/partials/app.html",
                    controller: "AppController",
                    controllerAs: "vm",
                },
                "content": {
                    templateProvider: ($templateCache) => {
                        return $templateCache.get('login.html');
                    },
                    // templateUrl: "login.html",
                    controller: "UserController",
                    controllerAs: "vm"
                },
            }
        })
        .state('register', {
            url: "/register",
            views: {
                "header": {
                    templateProvider: ($templateCache) => {
                        return $templateCache.get('app.html');
                    },
                    // templateUrl: "/partials/app.html",
                    controller: "AppController",
                    controllerAs: 'vm'
                },
                "content": {
                    templateProvider: ($templateCache) => {
                        return $templateCache.get('register.html');
                    },
                    // templateUrl: '/partials/register.html',
                    controller: "UserController",
                    controllerAs: "vm"
                }
            }
        })
        .state("dashboard", {
            url: "/dashboard",
            authenticate: true,
            views: {
                "header": {
                    templateProvider: ($templateCache) => {
                        return $templateCache.get('app.html');
                    },
                    // templateUrl: "/partials/app.html",
                    controller: "AppController",
                    controllerAs: 'vm',
                    authenticate: true
                },
                "content": {
                    templateProvider: ($templateCache) => {
                        return $templateCache.get('dashboard.html');
                    },
                    // templateUrl: '/partials/dashboard.html',
                    controller: "UserController",
                    controllerAs: "vm",
                    authenticate: true
                }
            }
        })
        .state("settings", {
            url: "/settings",
            authenticate: true,
            views: {
                "header": {
                    templateUrl: "/partials/app.html",
                    controller: "AppController",
                    controllerAs: 'vm',
                    authenticate: true
                },
                "content": {
                    templateUrl: '/partials/settings.html',
                    controller: "UserController",
                    controllerAs: "vm",
                    authenticate: true
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
        .state("draftboard", {
            url: "/draftboard",
            authenticate: true,
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
        // .state('')
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

DraftApp.run(function($rootScope, $location, $state, AuthenticationService){
    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
        // console.log(toState);
        // console.log(AuthenticationService.isLoggedIn());
        if (toState.authenticate && !AuthenticationService.isLoggedIn()) {
            console.log("Go To Login!");
            // $location.path("/login");
            $state.transitionTo('login');
        }
    });
});

DraftApp.run(function ($templateCache) {
    
});