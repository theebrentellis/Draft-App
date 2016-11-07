angular.module('AppController', []).controller('AppController', function ($scope, $location, $q, AuthenticationService, DraftService) {

    var vm = this;

    vm.isLoggedIn = AuthenticationService.isLoggedIn();

    vm.currentUser = AuthenticationService.currentUser();

    vm.currentLeague = DraftService.currentLeague();

    vm.setCurrentLeague = function(leagueId){
      DraftService.setCurrentLeagueId(leagueId);
      DraftService.getLeague();
    };

    vm.appViewChange = function(view){
      if(vm.isLoggedIn === true){
        if(view == "/availablePlayers" | view == "/draftBoard" | "/chat"){
          // DraftService.getLeague();
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

    vm.currentUserLogOut = function(){
      AuthenticationService.currentUserLogOut();
      $location.path("/login");
    };

    vm.deleteAllUsers = function(){
      AuthenticationService.deleteAllUsers();
      $location.path("/login");
    };

    vm.deleteAllChat = function(){
      DraftService.deleteAllChat();
    };

    vm.leaguesClearAll = function(){
      DraftService.leaguesClearAll();
    };


});