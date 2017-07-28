angular.module('AppController', []).controller('AppController', function (AuthenticationService, DraftService, LeagueService) {

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
  
  vm.logOut = () => {
    AuthenticationService.logOut();
  };
});