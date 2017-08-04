let DraftApp = angular.module("DraftApp", ["ngRoute", "ngMessages", "ngAnimate",
    "ui.router", "ui.bootstrap", "dndLists", "angular-confirm",
    "AppController", "ChatController", "DashboardController", "LeagueController", "LeagueCommishController", "LeagueJoinController", "LeagueNewController", "UserSettingsController", "UserLoginController", "UserRegisterController", "DraftController",
    "AuthenticationService", "DraftService", "LeagueService",
    "ChatFactory", "DraftFactory", "LeagueFactory", "UserFactory"]);

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
                    controller: "UserLoginController",
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
                    controller: "UserRegisterController",
                    controllerAs: "vm"
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
                    controller: "UserSettingsController",
                    controllerAs: "vm",
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
                    controller: "LeagueNewController",
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
                    controller: "LeagueJoinController",
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
                    resolve: {
                        league: function(LeagueService, $stateParams) {
                            return LeagueService.get();
                        }
                    }
                }
            }
        })
        .state('leagueCommish', {
            url: "/league/:leagueID/commish",
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
                        return $templateCache.get('league/league.commish.html');
                    },
                    controller: "LeagueCommishController",
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
        .state("draft", {
            url: "/league/:leagueID/draft/:draftID/index",
            // authenticate: true,
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
                        return $templateCache.get('draft/draft.index.html');
                    },
                    controller: "DraftController",
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