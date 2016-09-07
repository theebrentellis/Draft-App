angular.module('AppController', []).controller('AppController', function ($scope, $location, $route, $routeParams, LoginFactory) {
    $scope.greeting = "Welcome!";

    var vm = this;

    vm.user = null;

    initController();

    function initController(){
      LoginFactory.getCurrent(function(user){
        vm.user = user;
      });
    }


    $scope.viewChange = function(view){
      $location.path(view);
  };

  
});