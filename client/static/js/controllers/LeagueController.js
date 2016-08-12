angular.module('LeagueController', []).controller('LeagueController', function ($scope, $route, $routeParams, $controller, LeagueFactory) {
    $scope.league = [];

    $scope.createNewLeague = function(){
        LeagueFactory.createLeague($scope.newLeague, function(data){
            $scope.leagues = data;
        });
    };
    var getLeague = function(){
        LeagueFactory.getLeague(function(data){
            console.log(data);
            $scope.league = data;
        });
    };
    getLeague();

    $scope.leaguesClearAll = function(){
        console.log("In Controller");
        LeagueFactory.clearAll(function(data){
            console.log(data);
        })
    }

});