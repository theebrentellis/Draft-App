angular.module('PlayerController', []).controller('PlayerController', function ($scope, $http, $routeParams, $location, DraftFactory) {
  $scope.available_players = [];

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
    //   console.log(position);
    //   console.log($scope.players);
    DraftFactory.getPlayers($scope.players, function(data){
        $scope.available_players = data;
        getDraftedPlayers();
    });
  };
  $scope.draftPlayer = function(id){
      DraftFactory.draftPlayer(id, function(data){
          getDraftedPlayers();
      });
  };

  var getDraftedPlayers = function(){
      DraftFactory.getDraftedPlayers(function(data){
          $scope.allDraftedPlayers = data;
      });
  };
  getDraftedPlayers();


  $scope.newDraft = function () {
    DraftFactory.newDraft(function () {
    });
  };
});
