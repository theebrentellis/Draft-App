angular.module('PlayerController', []).controller('PlayerController', function ($scope, $location, $confirm, $timeout, DraftFactory, AuthenticationService, DraftService) {
  $scope.available_players = [];

  $scope.allDraftedPlayers = [];

  var vm = this;

  vm.message = "";

  vm.currentLeague = DraftService.currentLeague();

  vm.getPlayers = function (position) {
    DraftFactory.getPlayers($scope.players, function (data) {
      $scope.available_players = data;
    });
  };

  vm.draftPlayer = function (id) {
    
    if(DraftService.isOnClock() === true){
        DraftFactory.draftPlayer(id, function (data) {
          $scope.getPlayers();
        });
    }
    if(DraftService.isOnClock() === false){
      vm.message = "You Are Not On The Clock!";
      vm.checkBox.value = false;
      $timeout(function(){
        vm.message = false;
      }, 2500);
    }
    else{
      console.log("Error!");
    }
    
  };

  var getDraftedPlayers = function () {
    DraftFactory.getDraftedPlayers(function (data) {
      $scope.allDraftedPlayers = data;
    });
  };
  getDraftedPlayers();

  // $scope.newDraft = function () {
  //   DraftFactory.newDraft(function (data) {
  //     console.log("Draft Results Cleared");
  //   });
  // };





});
