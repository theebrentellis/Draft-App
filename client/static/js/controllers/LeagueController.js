angular.module('LeagueController', []).controller('LeagueController', function ($scope, $route, $routeParams, $controller, $confirm, LeagueFactory) {
    $scope.league = [];

    $scope.createNewLeague = function(){
        LeagueFactory.createLeague($scope.newLeague, function(data){
            $scope.leagues = data;
        });
    };
    var getLeague = function(){
        LeagueFactory.getLeague(function(data){
            $scope.league = data;
        });
    };
    getLeague();

    $scope.leaguesClearAll = function(){
        LeagueFactory.clearAll(function(data){
            console.log(data);
        });
    };

});