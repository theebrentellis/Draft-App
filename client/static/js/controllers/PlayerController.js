angular.module('PlayerController', []).controller('PlayerController', function ($scope, $http, DraftFactory) {
  $scope.drafted_players = [];

  $scope.get_players_api = [];

  var getAll = function () {
    DraftFactory.getAll(function (data) {
      $scope.drafted_players = data
    })
  }
  getAll()

  $scope.getPlayers = function () {
    var position = $scope.data.position_select
    $http.get('http://www.fantasyfootballnerd.com/service/players/json/rtj7893jmh8t/' + position)
      .success(function (data) {
        $scope.get_players_api = angular.fromJson(data)
      })
      .error(function (data) {
        console.log('Error: ' + data)
      })
  }

  $scope.draft = function () {
    console.log('In Client Controller Draft')
    console.log($scope.checkboxModel1)
    console.log($scope.checkboxModel)
    DraftFactory.draft($scope.drafted_player, function () {
      getAll()
    })
  }
})
