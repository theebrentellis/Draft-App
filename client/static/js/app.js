var DraftApp = angular.module("DraftApp", ["ngRoute", "ngMessages", "ngAnimate", "AppController", "PlayerController", "DraftFactory", "ui.router","ui.bootstrap", "angular-confirm", "LeagueController", "LeagueFactory", "LoginController", "LoginFactory"]);

DraftApp.config(function($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider){
    
    $urlRouterProvider.otherwise("/login");

    $stateProvider
        .state("login", {
            url:"/login",
            views: {
                "header":{
                    templateUrl: "/static/partials/app.html",
                    controller: "AppController",
                    controllerAs: "vm",
                    data: {
                        activeTab: "home"
                    }
                },
                "content":{
                    templateUrl: "/static/partials/login.html",
                    controller: "LoginController"
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

    function run($http, $rootScope, $window){
        $http.defaults.headers.common["Authorization"] = "Bearer " + $window.jwtToken;

        $root.Scope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams){
            $rootScope.activeTab = toState.data.activeTab;
        });
    }

    $(function(){
        $.get("token", function(token){
            window.jwtToken = token;

            angular.bootstrap(document, ["DraftApp"]);
        });
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

    // $locationProvider.html5Mode(true);
});

// DraftApp.run(function($rootScope){
//     $rootScope.$on("$stateChangeStart", function(event, next){
//         var requiredLogin = toState.data.requireLogin;

//         if(requireLogin && typeof $rootScope.currentUser === "undefined"){
//             event.preventDefault();
//         }
//     });
// });