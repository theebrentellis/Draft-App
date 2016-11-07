angular.module('PlayerController', []).controller('PlayerController', function ($scope, $location, $confirm, $timeout, DraftFactory, AuthenticationService, DraftService) {

  var vm = this;

  vm.available_players = [];

  vm.allDraftedPlayers = [];

  vm.message = "";

  vm.currentLeague = DraftService.currentLeague();

  vm.getPlayers = function (position) {
    DraftFactory.getPlayers(position, function (data) {
      vm.available_players = data;
    });
  };

  vm.draftPlayer = function (id) {
    if(DraftService.isOnClock() === true){
        DraftFactory.draftPlayer(id, function (data) {
          $location.path("/draftBoard");
          // vm.checkBox.value = false;
          console.log(data);
          // vm.getPlayers();
        });
    }
    if(DraftService.isOnClock() === false){
      console.log("In 2nd if!");
      vm.message = "You Are Not On The Clock!";
      vm.checkBox.value = false;
      $timeout(function(){
        vm.message = false;
      }, 2500);
    }
    // else{
    //   console.log("Error!");
    // }
    
  };

  var getDraftedPlayers = function () {
    DraftFactory.getDraftedPlayers(function (data) {
      vm.allDraftedPlayers = data;
    });
  };
  getDraftedPlayers();

  // $scope.newDraft = function () {
  //   DraftFactory.newDraft(function (data) {
  //     console.log("Draft Results Cleared");
  //   });
  // };





});
