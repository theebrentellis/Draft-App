angular.module('PlayerController', []).controller('PlayerController', function ($scope, $http, DraftFactory) {
  $scope.drafted_players = [];

  $scope.get_players_api = [];

  $scope.getAll = function () {
      
    var position = ["DEF"];
    for(x in position){
        $http.get('http://www.fantasyfootballnerd.com/service/players/json/rtj7893jmh8t/' + position[x]).success(function(data){
            console.log(data);
            console.log(data.Players[0].displayName);
            DraftFactory.getAll(data);
            // var players = angular.fromJson(data);
            // for(y in players.Players){
            //     var displayName = players.Players[y].displayName;
            //     var position = players.Players[y].position;
            //     DraftFactory.getAll(displayName, position);
            // }
        })
        .error(function(data){
            console.log("Error: "+data);
        });
    }
  };
  

  $scope.getPlayers = function () {
    var position = $scope.data.position_select;
    console.log(position);
    // $http.get('http://www.fantasyfootballnerd.com/service/players/json/rtj7893jmh8t/' + position)
    //   .success(function (data) {
    //     $scope.get_players_api = angular.fromJson(data);
    //   })
    //   .error(function (data) {
    //     console.log('Error: ' + data);
    //   });
  };

//   $scope.draft = function (name) {
//     console.log('In Client Controller Draft');
//     console.log(name);
//     DraftFactory.draft($scope.drafted_player, function () {
//       getAll()
//     })
//   }
});
