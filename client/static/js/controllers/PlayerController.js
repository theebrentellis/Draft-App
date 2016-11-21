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
