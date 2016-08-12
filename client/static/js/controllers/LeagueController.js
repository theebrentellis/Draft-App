angular.module('LeagueController', []).controller('LeagueController', function ($scope, $route, $routeParams, $controller, LeagueFactory) {
    $scope.leagues = [];

    $scope.createNewLeague = function(){
        LeagueFactory.createLeague($scope.newLeague, function(data){
            $scope.leagues = data;
        });
    };
});