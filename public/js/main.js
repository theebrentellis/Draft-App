let DraftApp = angular.module("DraftApp", ["ngRoute", "ngMessages", "ngAnimate", "ui.router", "ui.bootstrap", "angular-confirm", "AppController", "AuthenticationService", "ChatController", "DraftService", "LeagueController", "LeagueService", "PlayerController", "UserController", "ChatFactory", "DraftFactory", "LeagueFactory", "UserFactory"]);

DraftApp.config(function($stateProvider, $urlRouterProvider){
    
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state("home", {
            url: "/",
            views: {
                // "header":{
                //     templateUrl: "/static/partials/app.html",
                //     controller: "AppController",
                //     controllerAs: "vm"
                // },
                "content": {
                    templateUrl: "/static/partials/welcome.html",
                    controller: "AppController",
                    controllerAs: "vm"
                }
            }
        })
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
        .state("commish", {
            url: "/commish",
            views: {
                "header":{
                    templateUrl: "/static/partials/app.html",
                    controller: "AppController",
                    controllerAs: "vm"
                },
                "content":{
                    templateUrl: "/static/partials/commish.html",
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
                    templateUrl: "/static/partials/app.html",
                    controller: "AppController",
                    controllerAs: "vm",
                },
                "content": {
                    templateUrl: "/static/partials/availablePlayers.html",
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
                    templateUrl: "/static/partials/app.html",
                    controller: "AppController",
                    controllerAs: "vm"
                },
                "content": {
                    templateUrl: "/static/partials/draftBoard.html",
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
                    templateUrl: "/static/partials/app.html",
                    controller: "AppController",
                    controllerAs: "vm"
                },
                "content": {
                    templateUrl: "/static/partials/chat.html",
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
angular.module('AppController', []).controller('AppController', function ($scope, $location, $q, $state, AuthenticationService, DraftService, LeagueService) {

    var vm = this;

    vm.isLoggedIn = AuthenticationService.isLoggedIn();

    vm.currentUser = AuthenticationService.currentUser();

    vm.currentLeague = LeagueService.currentLeague();

    //Changes Views
    vm.appViewChange = function(view){
      if(vm.isLoggedIn === true){
        if(view == "/availablePlayers" | view == "/draftBoard" | "/chat"){
          $location.path(view);
        }
        else{
          $location.path(view);
        }  
      }
      else{
        $location.path("/login");
      }
    };

    //Sets A League and Returns League Info
    vm.setCurrentLeague = function(leagueId){
      return LeagueService.setCurrentLeagueId(leagueId)
        .then(function(){
          return LeagueService.getLeague()
            .then(function(){
              $state.reload();
            }, function(error){
              console.log(error);
            });
        }, function(error){
          console.log(error);
        });
    };

    //Sets Current League To Bold
    vm.setColor = function(league){
      var currentLeague = LeagueService.currentLeague();
      if(currentLeague._id === league._id){
        return {"font-weight": "bold"};
      }
    };

    vm.goLogin = function () {
      $location.url("/login");
    };
    
    vm.goRegister = function () {
      $location.url("/register");
  }

    //Dev Tools (Not For Production)
    vm.deleteAllDBs = function(){
      DraftService.deleteAllPlayers();
      AuthenticationService.deleteAllUsers();
      LeagueService.deleteAllChat();
      DraftService.deleteAllDrafts();
    };
  
    vm.downloadPlayers = function(){
      DraftService.downloadPlayers(function(data){
        console.log(data);
      });
    };
  
    vm.deleteAllPlayers = function(){
      DraftService.deleteAllPlayers(function(data){
        console.log(data);
      });
    };
  
    vm.deleteAllUsers = function(){
      AuthenticationService.deleteAllUsers();
      $location.path("/login");
    };
  
    vm.deleteAllChat = function(){
      LeagueService.deleteAllChat();
    };
  
    vm.deleteAllLeagues = function(){
      LeagueService.deleteAllLeagues();
    };
  
    vm.deleteAllDrafts = function(){
      DraftService.deleteAllDrafts();
    };
  
    vm.currentUserLogOut = function(){
      AuthenticationService.currentUserLogOut();
    };
  
});
angular.module('ngEnter', []).directive('ngEnter', function ($scope, element, attrs) {

    element.bind("keypress", function (event) {
        if (event.which === 13) {
            $scope.$apply(function () {
                $scope.$eval(attrs.ngEnter);
            });
            event.preventDefault();
        }
    });
});

angular.module('ChatController', []).controller('ChatController', function ($scope, AuthenticationService, LeagueService, ChatFactory) {

    var vm = this;

    vm.currentUser = AuthenticationService.currentUser();

    vm.currentLeague = LeagueService.currentLeague();

    vm.messages = [];

    vm.message = "";
    vm.filterText = "";

    
    var socket = io.connect();

    socket.on("pastMessages", function (data) {
        $scope.$apply(function(){
            vm.messages = data.reverse();
        });
    });

    socket.on("receiveMessage", function(data){
        $scope.$apply(function(){
            vm.messages.unshift(data);
        });
    });

    vm.sendMessage = function () {
        // var chatMessage = {
        //     "_id": vm.currentLeague.chat._id,
        //     "userName": vm.currentUser.firstName,
        //     "message": vm.message
        // };
        LeagueService.postMessage(vm.message, function (result, err) {
            if (err) {
                window.alert("Error!");
            }
            // else{
            //     socket.emit("receiveMessage", result);
            //     vm.message = "";
            // }
        });
    };
});
angular.module('LeagueController', []).controller('LeagueController', function ($scope, $q, $confirm, $location, AuthenticationService, LeagueService) {
    
    var vm = this;

    vm.allLeagues = [];

    vm.currentUser = AuthenticationService.currentUser();

    vm.currentLeague = LeagueService.currentLeague();

    vm.createNewLeagueView = false;
    vm.findLeagueView = false;

    var getAllLeagues = function(){
        return LeagueService.getAllLeagues()
            .then(function(leagues){
                vm.allLeagues = leagues;
            }, function(error){
                console.log(error);
            });
    };

    // var getUserLeague = function(id){
    //     LeagueService.getUserLeague(id, function(league){
    //     });
    // };

    vm.leagueViewChange = function(view){
        if(view === "createNew"){
            vm.createNewLeagueView = true;
            vm.findLeagueView = false;
        }
        if(view === "findLeague"){
            return getAllLeagues()
                .then(function(){
                    vm.findLeagueView = true;
                    vm.createNewLeagueView = false;
                }, function(error){
                    console.log(error);
                });
            
            
        }
    };

    vm.createNewLeague = function(){
        var newLeagueInfo = {
            "leagueName": vm.newLeague.leagueName,
            "userId": vm.currentUser._id
        };
        LeagueService.createNewLeague(newLeagueInfo);
    };

    vm.joinLeague = function(leagueId, callback){
        LeagueService.joinLeague(leagueId, function(status){
            if(status == "Success"){
                console.log("Success!");
            }
            else{
                console.log("Error");
            }
        });
    };

});
angular.module('PlayerController', []).controller('PlayerController', function ($scope, $location, $confirm, $timeout, $q, DraftFactory, AuthenticationService, DraftService, LeagueService) {

  var vm = this;

  vm.available_players = [];

  vm.allDraftedPlayers = [];

  vm.message = "";

  vm.currentUser = AuthenticationService.currentUser();

  vm.currentLeague = LeagueService.currentLeague();

  vm.setColorOnClock = function(team){
      if(vm.currentLeague.onClock === team._id){
        return {"font-weight": "bold"};
      }
  };

  vm.getPlayers = function (position) {
    DraftFactory.getPlayers(position, function (data) {
      vm.available_players = data;
    });
  };

  vm.startDraft = function(id){
    var draftPackage = {
      draftId: vm.currentLeague.draft._id,
      draftOrder: vm.currentLeague.draftOrder

    };
    return DraftService.startDraft(draftPackage)
      .then(function(response){
        console.log(response);
      }, function(error){
        console.log(error);
      });
  };

  vm.draftPlayer = function (id) {
    if(DraftService.isOnClock() === true){

      var draftPackage = {
        draftId: vm.currentLeague.draft._id,
        leagueId: vm.currentLeague._id,
        team: vm.currentUser._id,
        pick: id,
      };
      
      return DraftService.draftPlayer(draftPackage)
        .then(function(response){
          console.log(response);
          if(response === true){
            $location.path("/draftBoard");
          }
          if(response === false){
            console.log("Error in PlayerControiller draftPlayer");
          }
        }, function(error){
          console.log(error);
        });
    }
    if(DraftService.isOnClock() === false){
      vm.message = "You Are Not On The Clock!";
      vm.checkBox.value = false;
      $timeout(function(){
        vm.message = false;
      }, 5000);
    }
  };

  var getDraftedPlayers = function () {
    DraftFactory.getDraftedPlayers(function (data) {
      vm.allDraftedPlayers = data;
    });
  };
  getDraftedPlayers();
});

angular.module('UserController', []).controller('UserController', function($scope, $q, $view, $location, $state, AuthenticationService, LeagueService){
    var vm = this;

    vm.currentUser = AuthenticationService.currentUser();

    vm.currentLeague = LeagueService.currentLeague();

    vm.message = "";

    vm.loginView = true;
    vm.registerView = false;

    vm.userViewChange = function(view){
        if(view === true){
            vm.loginView = false;
            vm.registerView = true;
        }
        else{
            vm.loginView = true;
            vm.registerView = false;
        }
    };

    vm.registerInfo = {
        email: "",
        userName: "",
        firstName: "",
        password: ""
    };

    vm.loginInfo = {
        email: "",
        password: ""
    };

    vm.registerNew = function(){
        AuthenticationService.register(vm.registerInfo, function(data){
            if(data === "Success"){
                $location.path("/commish");
            }
            else{
                vm.message = data;
            }     
        });
    };

    vm.login = function(){
       return AuthenticationService.login(vm.loginInfo)
            .then(function(response){
                if(response == "Success"){
                    theUser = AuthenticationService.currentUser();
                    if(theUser.leagues[0] === undefined){
                        $location.path("/commish");
                    }
                    else{
                        $q.when(LeagueService.setCurrentLeagueId(theUser.leagues[0]._id))
                            .then(function(){
                                return LeagueService.getLeague()
                                    .then(function(response){
                                        $location.path("/availablePlayers");
                                    }, function(error){
                                        console.log(error);
                                    });
                            }, function(error){
                                console.log(error);
                            });
                    }             
                }
                else{
                    vm.message = response;
                    console.log(response);
                }
            }, function(error){
                console.log(error);
            });
    };

    function onSignIn(googleUser){
        console.log("Fired onSign In");
        if(googleUser){
            var profile = googleUser.getBasicProfile();
            console.log("Email: " + profile.getEmail());
        }
    }

});


angular.module("ChatFactory", []).factory("ChatFactory", function($http){

    var factory = {};

    factory.postMessage = function(message, callback){
        $http.post("/message", message).success(function(data, status){
            callback(data, false);
        })
        .error(function(data, status){
            callback(data, true);
        });
    };

    factory.deleteAllChat = function(){
        $http.post("/deleteAllChat").success(function(data){
            console.log(data);
        });
    };

    return factory;
});
angular.module("DraftFactory", []).factory("DraftFactory", function($http, $q){
    var factory = {};

    factory.downloadPlayers = function(){
        $http.post("/downloadPlayers").success(function(data){
            console.log(data);
        });
    };

    factory.getPlayers = function(position, callback){
        $http.get("/getPlayers/", {params: {position: position}}).success(function(output){
            callback(output);
        });
    };

    factory.deleteAllPlayers = function(callback){
        $http.post("/deleteAllPlayers").success(function(data){
            callback(data);
        });
    };

    factory.startDraft = function(draftPackage){
        return $http.post("/startDraft", draftPackage)
            .then(function(response){
                console.log(response);
            }, function(error){
                console.log(error);
            });
    };

    factory.draftPlayer = function(draftPackage){
        return $http.post("/draftPlayer", draftPackage)
            .then(function(response){
                return response;
            }, function(error){
                console.log(error);
            });
    };

    factory.getDraftedPlayers = function(callback){
        $http.get("/getDraftedPlayers").success(function(output){
            callback(output);
        });
    };

    factory.deleteAllDrafts = function(){
        return $http.post("/deleteAllDrafts");
    };

    return factory;
});
angular.module("LeagueFactory", []).factory("LeagueFactory", function($http){
    var factory = {};

    factory.createLeague = function(newLeagueInfo){
        return $http.post("/createLeague", newLeagueInfo)
            .then(function(token){
                return token;
            }, function(error){
                console.log(error);
                return error;
            });
    };

    factory.getLeague = function(leagueId){
        return $http.get("/getLeague/", {params: {_id: leagueId}})
            .then(function(data){
                return data;
            }, function(error){
                console.log(error);
            });
    };

    factory.getAllLeagues = function(){
        return $http.get("/getAllLeagues")
            .then(function(response){
                return response.data;
            }, function(error){
                console.log(error);
            });
    };

    factory.joinLeague = function(package){
        return $http.patch("/joinLeague/", package)
            .then(function(response){
                return response.data.token;
            }, function(error){
                console.log(error);
            });
    };

    factory.deleteAllLeagues = function(){
        return $http.post("/leaguesClearAll")
            .then(function(response){
            }, function(error){
                console.log(error);
            });
        // .success(function(data){
        //     console.log(data);
        // });
    };

    return factory;
});

angular.module('UserFactory', []).factory('UserFactory', function ($http, $q) {
  var factory = {};

  factory.register = function(registerInfo, callback){
    $http.post("/register", registerInfo).success(function(data){
      callback(data);
    });
  };

  factory.login = function(loginInfo){
   return $http.post("/login", loginInfo)
      .then(function(data){
        return data;
      });
  };

  factory.deleteAllUsers = function(callback){
    $http.post("/deleteAllUsers").success(function(data){
      console.log(data);
      callback(data);
    });
  };

  factory.getUserLeague = function(callback){
    $http.get("/getUserLeagues").success(function(data){
      console.log(data);
      callback(data);
    });
  };

  return factory;
});
angular.module('AuthenticationService', []).service('AuthenticationService', function ($window, $state, $rootScope, $location, $q, UserFactory) {
  var service = {};

  var saveToken = function (token) {
    $window.localStorage['user-token'] = token;
  };

  var getToken = function () {
    return $window.localStorage['user-token'];
  };

  service.isLoggedIn = function () {
    var token = getToken();
    var payload;

    if (token) {
      payload = token.split('.')[1];
      payload = $window.atob(payload);
      payload = JSON.parse(payload);

      return payload.exp > Date.now() / 1000;
    }else {
      return false;
    }
  };

  service.currentUser = function () {
    if (service.isLoggedIn()) {
      var token = getToken();
      var payload = token.split('.')[1];

      payload = $window.atob(payload);
      payload = JSON.parse(payload);

      return {
        _id: payload._id,
        userName: payload.userName,
        firstName: payload.firstName,
        leagues: payload.leagues
      };
    }
  };

  service.updateToken = function (token) {
    $q.resolve($window.localStorage.removeItem('user-token'))
      .then(function(){
        saveToken(token);
        return "Done";
      }, function(error){
        console.log(error);
      });
  };

  service.register = function (user, callback) {
    UserFactory.register(user, function (data) {
      if (data.token) {
        saveToken(data.token);
        callback('Success');
      }
      if (data.message) {
        callback(data.message);
      }else {
        callback('Unknown Error!');
      }
    });
  };

  service.login = function (user) {
    return UserFactory.login(user)
      .then(function (response) {
        if (response.data.token) {
          saveToken(response.data.token);
          return 'Success';
        }else {
          return response.data.message;
        }
      }, function (err) {
        console.log(err);
      });
  };

  service.currentUserLogOut = function () {
    $window.localStorage.clear();
    $rootScope = $rootScope.$new(true);
    $location.path("/login");
  };

  service.deleteAllUsers = function () {
    UserFactory.deleteAllUsers();
    $window.localStorage.clear();
    $rootScope = $rootScope.$new(true);
    $location.path("/login");
  };
  // service.currentUserLogOut();

  return service;
});

angular.module('DraftService', []).service('DraftService', function ($window, $state, $q, DraftFactory, AuthenticationService, LeagueService) {
    var service = {};

    var vm = this;

    vm.currentUser = AuthenticationService.currentUser();

    vm.isLoggedIn = AuthenticationService.isLoggedIn();

    vm.currentLeague = LeagueService.currentLeague();

    service.startDraft = function(draftPackage){
        return DraftFactory.startDraft(draftPackage)
            .then(function(reponse){
                console.log(response);
            }, function(error){
                console.log(error);
            });
    };

    service.isOnClock = function(){
        if(vm.currentLeague.onClock === vm.currentUser._id){
            return true;
        }
        else{
            return false;
        }
    };

    service.draftPlayer = function(draftPackage){
        return DraftFactory.draftPlayer(draftPackage)
            .then(function(response){
                if(response.statusText === "OK"){
                    return true;
                }
                else{
                    return false;
                }
            }, function(error){
                console.log(error);
            });
    };

    service.undraftedPlayers = function () {

    };

    service.draftedPlayers = function () {

    };

    service.downloadPlayers = function(){
        DraftFactory.downloadPlayers();
    };

    service.deleteAllChat = function(){
        ChatFactory.deleteAllChat();
    };

    service.deleteAllDrafts = function(){
        DraftFactory.deleteAllDrafts();
    };

    service.deleteAllPlayers = function(callback){
        DraftFactory.deleteAllPlayers(function(data){
            callback(data);
        });
    };

    return service;
});
angular.module("LeagueService", []).service("LeagueService", function($window, $state, $q, $location, LeagueFactory, ChatFactory, AuthenticationService){
    var service = {};

    var vm = this;

    vm.currentUser = AuthenticationService.currentUser();
    vm.isLoggedIn = AuthenticationService.isLoggedIn();

    var saveCurrentLeagueId = function(leagueId){
        $q.resolve($window.localStorage["current-league-id"] = leagueId);
    };

    var currentLeagueId = function(){
        if($window.localStorage["current-league-id"]){
            return $window.localStorage["current-league-id"];
        }
        else{
            return false;
        }
    };

    var saveCurrentLeague = function(league){
        if($window.localStorage["current-league"]){
            $window.localStorage.removeItem("current-league");
            $window.localStorage.setItem("current-league", JSON.stringify(league));
        }
        else{
            $window.localStorage.setItem("current-league", JSON.stringify(league));
        }
    };

    service.currentLeague = function(){
        var theLeague = JSON.parse($window.localStorage.getItem("current-league"));
        return theLeague;
    };

    service.setCurrentLeagueId = function(leagueId){
        if(leagueId){
            return $q.when(saveCurrentLeagueId(leagueId));
        }
    };

    service.getCurrentLeagueId = function(){
        if(currentLeagueId){
            return currentLeagueId;
        }
    };

    service.getLeague = function(){
        var theLeague = currentLeagueId();
        return LeagueFactory.getLeague(theLeague)
            .then(function(response){
                $q.resolve(saveCurrentLeague(response.data))
                    .then(function(){
                        return "Done";
                    }, function(error){
                        console.log(error);
                    });
            }, function(error){
                console.log(error);
            });
    };

    service.createNewLeague = function (newLeagueInfo) {
        $q.when(LeagueFactory.createLeague(newLeagueInfo))
            .then(function(response){
                $q.when(AuthenticationService.updateToken(response.data.token))
                    .then(function(){
                        currentUser = AuthenticationService.currentUser();
                        $q.when(service.setCurrentLeagueId(currentUser.leagues[0]._id))
                            .then(function(){
                                $q.when(service.getLeague())
                                    .then(function(response){
                                        $location.path("/availablePlayers");
                                        return response;
                                    }, function(error){
                                        console.log(error);
                                    });
                            }, function(error){
                                console.log(error);
                            });
                    }, function(error){
                        console.log(error);
                    });
            }, function(error){
                console.log(error);
            });
    };

    service.joinLeague = function(leagueId){
        currentUser = AuthenticationService.currentUser();
        var package = {
            "userId": currentUser._id,
            "leagueId": leagueId
        };
        return LeagueFactory.joinLeague(package)
            .then(function(updateToken){
                $q.when(AuthenticationService.updateToken(updateToken))
                    .then(function(){
                        updatedCurrentUser = AuthenticationService.currentUser();
                        $q.when(service.setCurrentLeagueId(updatedCurrentUser.leagues[0]._id))
                            .then(function(){
                                $q.when(service.getLeague())
                                    .then(function(){
                                        $location.path("/availablePlayers");
                                    }, function(error){
                                        console.log(error);
                                    });
                            }, function(error){
                                console.log(error);
                            });
                    }, function(error){
                        console.log(error);
                    });
            }, function(error){
                console.log(error);
            });
    };

    service.getAllLeagues = function(){
        currentUser = AuthenticationService.currentUser();
        if(currentUser.leagues[0] === undefined){
            return LeagueFactory.getAllLeagues()
                .then(function(leagues){
                    return leagues;
                }, function(error){
                    console.log(error);
                });
        }
        else{
            return LeagueFactory.getAllLeagues()
                .then(function(leagues){
                    for(var x in leagues){
                        for(var y in currentUser.leagues){
                            if(leagues[x]._id == currentUser.leagues[y]._id){
                                leagues.splice(x, 1);
                            }
                        }
                    }
                    return leagues;
                }, function(error){
                    console.log(error);
                });
        }   
    };

    service.postMessage = function(message){
        var theLeague = service.currentLeague();

        var chatMessage = {
            "_id": theLeague.chat._id,
            "userName": vm.currentUser.firstName,
            "message": message
        };

        ChatFactory.postMessage(chatMessage, function(result, err){
            if(err){
                console.log(err);
            }
            if(result){
                console.log(result);
            }
        });
    };

    service.deleteAllLeagues = function () {
        LeagueFactory.deleteAllLeagues();
    };

    service.deleteAllChat = function(){
        ChatFactory.deleteAllChat();
    };

    return service;
});