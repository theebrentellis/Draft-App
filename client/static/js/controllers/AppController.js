angular.module('AppController', []).controller('AppController', function ($scope, $location, $route, $routeParams, $controller) {
    $scope.greeting = "Welcome!";

    $scope.viewChange = function(view){
      console.log("In viewChange");
      console.log(view);
      $location.path(view);
  };
});