angular.module('AppController', []).controller('AppController', function ($scope, $location, AuthenticationService, DraftService, UserFactory, ChatFactory) {
    $scope.greeting = "Welcome!";

    var vm = this;

    vm.isLoggedIn = AuthenticationService.isLoggedIn();

    vm.currentUser = AuthenticationService.currentUser();

    vm.currentLeague = DraftService.currentLeague();

    vm.setCurrentLeague = function(leagueId){
      DraftService.setCurrentLeagueId(leagueId);
    };

    console.log(vm.currentLeague);

    $scope.appViewChange = function(view){
      if(vm.isLoggedIn === true){
        if(view == "/availablePlayers" | view == "/draftBoard" | "/chat"){
          DraftService.getLeague();
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

    $scope.downloadPlayers = function(){
      DraftService.downloadPlayers(function(data){
        console.log(data);
      });
    };

    $scope.deleteAllPlayers = function(){
      DraftService.deleteAllPlayers();
    };

    $scope.currentUserLogOut = function(){
      AuthenticationService.currentUserLogOut();
      if(!AuthenticationService.isLoggedIn()){
        $location.path("/login");
      }
    };

    $scope.deleteAllUsers = function(){
      UserFactory.deleteAllUsers();
      $location.path("/login");
    };

    $scope.deleteAllChat = function(){
      ChatFactory.deleteAllChat();
    };

    $scope.leaguesClearAll = function(){
      DraftService.leaguesClearAll();
    };
});