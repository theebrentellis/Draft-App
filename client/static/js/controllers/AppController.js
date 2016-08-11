angular.module('AppController', []).controller('AppController', function ($scope, $location, $route, $routeParams) {
    $scope.greeting = "Welcome!";

    $scope.viewChange = function(view){
      $location.path(view);
  };
});