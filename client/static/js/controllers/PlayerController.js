angular.module('PlayerController', []).controller('PlayerController', function ($scope, $http, $route, $routeParams, $location, $controller, $confirm, DraftFactory) {
  $scope.available_players = [];

  $scope.allDraftedPlayers = [];

  $scope.getAll = function () {
    var position = ['QB', 'RB', 'WR', 'TE', 'K', 'DEF'];
    for (var x in position) {
      $http.get('http://www.fantasyfootballnerd.com/service/players/json/rtj7893jmh8t/' + position[x]).success(function (data) {
        DraftFactory.getAll(data);
      }).success(function(){
          console.log("Success!!");
      })
        .error(function (data) {
          console.log('Error: ' + data);
        });
    }
  };

  $scope.getPlayers = function (position) {
    DraftFactory.getPlayers($scope.players, function (data) {
      $scope.available_players = data;
    });
  };

  $scope.draftPlayer = function (id) {
    DraftFactory.draftPlayer(id, function (data) {
      $scope.getPlayers();
    });
  };

  var getDraftedPlayers = function () {
    DraftFactory.getDraftedPlayers(function (data) {
      $scope.allDraftedPlayers = data;
    });
  };
  getDraftedPlayers();

  $scope.newDraft = function () {
    DraftFactory.newDraft(function (data) {
      console.log("Draft Results Cleared");
    });
  };


});
