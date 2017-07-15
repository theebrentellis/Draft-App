angular.module('AppController', []).controller('AppController', function ($scope, $location, $q, $state, AuthenticationService, DraftService, LeagueService) {

  let vm = this;
  
  vm.isLoggedIn = false;
  let getLoginStatus = AuthenticationService.isLoggedIn();
  getLoginStatus.then((response) => {
    if (response == true) {
      vm.isLoggedIn = true;
    }
    if (response == false) {
      vm.isLoggedIn = false;
    }
  }, (error) => {
    console.log(error);
  });
      
  vm.currentUser = {};
  let getCurrentUser = AuthenticationService.currentUser();
  getCurrentUser.then((response) => {
    vm.currentUser = response;
  }, (error) => {
    console.log(error);
  });

    vm.currentLeague = LeagueService.currentLeague();


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