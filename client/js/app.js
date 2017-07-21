let DraftApp = angular.module("DraftApp", ["ngRoute", "ngMessages", "ngAnimate", "ui.router", "ui.bootstrap", "angular-confirm", "AppController", "AuthenticationService", "ChatController", "DashboardController", "DraftService", "LeagueController", "LeagueService", "PlayerController", "UserController", "ChatFactory", "DraftFactory", "LeagueFactory", "UserFactory"]);

angular.module('DraftApp').config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");

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
            url: "/login",
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
                        return $templateCache.get('auth/login.html');
                    },
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
                    controller: "AppController",
                    controllerAs: 'vm'
                },
                "content": {
                    templateProvider: ($templateCache) => {
                        return $templateCache.get('auth/register.html');
                    },
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
                    controller: "DashboardController",
                    controllerAs: "vm",
                }
            }
        })
        .state('newLeague', {
            url: "/league/new",
            authenticate: true,
            views: {
                'header': {
                    templateProvider: ($templateCache) => {
                        return $templateCache.get('app.html');
                    },
                    controller: "AppController",
                    controllerAs: 'vm'
                },
                'content': {
                    templateProvider: ($templateCache) => {
                        return $templateCache.get('league/league.new.html');
                    },
                    controller: "LeagueController",
                    controllerAs: "vm"
                }
            }
        })
        .state('joinLeague', {
            url: "/league/join",
            authenticate: true,
            views: {
                "header": {
                    templateProvider: ($templateCache) => {
                        return $templateCache.get('app.html');
                    },
                    controller: "AppController",
                    controllerAs: 'vm'
                },
                "content": {
                    templateProvider: ($templateCache) => {
                        return $templateCache.get('league/league.join.html');
                    },
                    controller: "LeagueController",
                    controllerAs: "vm"
                }
            }
        })
        .state('league', {
            url: "/league/:leagueID/index",
            authenticate: true,
            views: {
                "header": {
                    templateProvider: ($templateCache) => {
                        return $templateCache.get('app.html');
                    },
                    controller: "AppController",
                    controllerAs: 'vm'
                },
                "content": {
                    templateProvider: ($templateCache) => {
                        return $templateCache.get('league/league.index.html');
                    },
                    controller: "LeagueController",
                    controllerAs: "vm",
                    // resolve: {
                    //     league: (LeagueService, $stateParams) => {
                    //         console.log($stateParams)
                    //         // let theLeague = LeagueService.getLeague();
                    //         // theLeague.then((response) => {
                                
                    //         // }, (error) => {
                    //         //     console.log(error);
                    //         // });
                    //     }
                    // }
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
                        return $templateCache.get('auth/settings.html');
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
                    controllerAs: "vm"
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

angular.module('DraftApp').run(function ($transitions, $location, $state, $q, AuthenticationService) {
    $transitions.onStart({ to: '*' }, function (trans) {
        let AuthService = trans.injector().get('AuthenticationService');
        if (trans.to().authenticate && !AuthService.isLoggedIn()) {
            $state.transitionTo('login');
        }
    });
});