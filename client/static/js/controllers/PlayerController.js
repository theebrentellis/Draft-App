angular.module('PlayerController', []).controller('PlayerController', function ($scope, $http, $routeParams, $location, DraftFactory) {
  $scope.available_players = [];

  //$scope.get_players_api = [];

  $scope.allDraftedPlayers = [];

  $scope.getAll = function () {
      
    var position = ["QB", "RB", "WR", "TE", "K", "DEF"];
    for(var x in position){
        $http.get('http://www.fantasyfootballnerd.com/service/players/json/rtj7893jmh8t/' + position[x]).success(function(data){
            DraftFactory.getAll(data);
        })
        .error(function(data){
            console.log("Error: "+data);
        });
    }
  };
  

  $scope.getPlayers = function (position) {
      //console.log($routeParams);
      //console.log(req.body);
    DraftFactory.getPlayers($scope.data.position_select, function(data){
        $scope.available_players = data;
        console.log($scope.available_players);
    });
  };
  $scope.draftPlayer = function(id){
      DraftFactory.draftPlayer(id, function(data){
          console.log(data);
          getDraftedPlayers();
      });
  };

  var getDraftedPlayers = function(){
      DraftFactory.getDraftedPlayers(function(data){
          console.log(data);
          $scope.allDraftedPlayers = data;
      });
  };

  $scope.newDraft = function () {
    DraftFactory.newDraft(function () {
    });
  };
});
