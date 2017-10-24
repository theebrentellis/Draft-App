let DraftApp = angular.module("DraftApp", ["ngRoute", "ngMessages", "ngAnimate",
    "ui.router", "ui.bootstrap", "dndLists", "angular-confirm",
    "AppController", "DashboardController", "LeagueController", "LeagueCommishController", "LeagueJoinController", "LeagueNewController", "UserSettingsController", "UserLoginController", "UserRegisterController", "DraftController", "DraftPickController", "DraftBoardController", "DraftChatController",
    "AuthenticationService", "ChatService", "DraftService", "LeagueService",
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
                        league: function (LeagueService, $stateParams) {
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
                    controllerAs: "vm"
                }
            }
        })
        .state("draft", {
            url: "/league/:leagueID/draft/:draftID",
            authenticate: true,
            resolve: {
                _draft: function (DraftService, $stateParams) {
                    return DraftService.getDraft($stateParams);
                }
            },
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
        .state("draft.pick", {
            url: "/pick",
            authenticate: true,
            views: {
                "draftPick": {
                    templateProvider: ($templateCache) => {
                        return $templateCache.get('draft/draft.pick.html')
                    },
                    controller: "DraftPickController",
                    controllerAs: "vm"
                }
            }
        })
        .state("draft.draftBoard", {
            url: "/draftBoard",
            authenticate: true,
            views: {
                "draftBoard": {
                    templateProvider: ($templateCache) => {
                        return $templateCache.get('draft/draft.draftBoard.html');
                    },
                    controller: "DraftBoardController",
                    controllerAs: "vm",
                }
            }
        })
        .state("draft.chat", {
            url: "/chat",
            authenticate: true,
            views: {
                "draftChat": {
                    templateProvider: ($templateCache) => {
                        return $templateCache.get('draft/draft.chat.html');
                    },
                    controller: "DraftChatController",
                    controllerAs: "vm"
                }
            }
        });
});

angular.module('DraftApp').run(function ($transitions, $state, $location, AuthenticationService) {

    $transitions.onStart({ to: '*' }, (trans) => {
        return AuthenticationService.isLoggedIn().then((response) => {
            if (trans.to().authenticate && response == false) {
                $state.transitionTo('login');
            }
        }, (error) => {
            console.log(error);
        });
    });

    $transitions.onStart({ to: 'login' }, (trans) => {
        return AuthenticationService.isLoggedIn().then((response) => {
            if (response == true) {
                $state.transitionTo('dashboard');
            }
        }, (error) => {
            console.log(error);
        });
    });

});