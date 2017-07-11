let DraftApp = angular.module("DraftApp", ["ngRoute", "ngMessages", "ngAnimate", "ui.router", "ui.bootstrap", "angular-confirm", "AppController", "AuthenticationService", "ChatController", "DashboardController", "DraftService", "LeagueController", "LeagueService", "PlayerController", "UserController", "ChatFactory", "DraftFactory", "LeagueFactory", "UserFactory"]);

angular.module('DraftApp').config(function($stateProvider, $urlRouterProvider){
    
    $urlRouterProvider.otherwise("/dashboard");

    $stateProvider
        .state("index", {
            url: "/",
            views: {
                "content": {
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
                    controller: "AppController",
                    controllerAs: 'vm',
                },
                "content": {
                    templateProvider: ($templateCache) => {
                        return $templateCache.get('dashboard.html');
                    },
                    controller: "UserController",
                    controllerAs: "vm",
                }
            }
        })
        .state("settings", {
            url: "/settings",
            authenticate: true,
            views: {
                "header": {
                    templateProvider: ($templateCache) => {
                        return $templateCache.get('app.html');
                    },
                    controller: "AppController",
                    controllerAs: 'vm',
                },
                "content": {
                    templateProvider: ($templateCache) => {
                        return $templateCache.get('settings.html');
                    },
                    controller: "UserController",
                    controllerAs: "vm",
                }
            }
        })
        .state("commish", {
            url: "/commish",
            authenticate: true,
            views: {
                "header": {
                    templateProvider: ($templateCache) => {
                        return $templateCache.get('app.html');
                    },
                    controller: "AppController",
                    controllerAs: "vm"
                },
                "content": {
                    templateProvider: ($templateCache) => {
                        return $templateCache.get('commish.html');
                    },
                    controller: "LeagueController",
                    controllerAs: "vm"
                }
            }
        })
        .state("availablePlayers", {
            url: "/availablePlayers",
            authenticate: true,
            views: {
                "header": {
                    templateProvider: ($templateCache) => {
                        return $templateCache.get('app.html');
                    },
                    controller: "AppController",
                    controllerAs: "vm",
                },
                "content": {
                    templateProvider: ($templateCache) => {
                        return $templateCache.get('availablePlayers.html');
                    },
                    controller: "PlayerController",
                    controllerAs: "vm",
                }
            }
        })
        .state("draftboard", {
            url: "/draftboard",
            authenticate: true,
            views: {
                "header": {
                    templateProvider: ($templateCache) => {
                        return $templateCache.get('app.html');
                    },
                    controller: "AppController",
                    controllerAs: "vm"
                },
                "content": {
                    templateProvider: ($templateCache) => {
                        return $templateCache.get('draftBoard.html');
                    },
                    controller: "PlayerController",
                    controllerAs: "vm",
                    authenticate: true
                }
            }
        })
        .state("chat", {
            url: "/chat",
            authenticate: true,
            views: {
                "header": {
                    templateProvider: ($templateCache) => {
                        return $templateCache.get('app.html');
                    },
                    controller: "AppController",
                    controllerAs: "vm"
                },
                "content": {
                    templateProvider: ($templateCache) => {
                        return $templateCache.get('chat.html');
                    },
                    controller: "ChatController",
                    controllerAs: "vm"
                }
            }
        });
});

angular.module('DraftApp').run(function ($transitions, $location, $state, AuthenticationService) {
    $transitions.onStart({to: '*'}, function (trans) {
        let AuthService = trans.injector().get('AuthenticationService');
        if (trans.to().authenticate && !AuthService.isLoggedIn()) {
            console.log("Go To Login!");
            $state.transitionTo('login');
        }
    });
});

DraftApp.run(function ($templateCache) {
    
});