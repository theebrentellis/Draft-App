angular.module('AppController', []).controller('AppController', function ($scope, $route, $routeParams, $location, DraftFactory) {
    $scope.greeting = "Welcome!";

    $scope.viewChange = function(view){
      console.log("In viewChange");
      console.log(view);
      $location.path(view);
  };
});