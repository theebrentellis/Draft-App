angular.module('AppController', []).controller('AppController', function ($scope, $location, AuthenticationService) {
    $scope.greeting = "Welcome!";

    var vm = this;

    vm.isLoggedIn = AuthenticationService.isLoggedIn();

    vm.currentUser = AuthenticationService.currentUser();


    $scope.viewChange = function(view){
      $location.path(view);
  };

  
});