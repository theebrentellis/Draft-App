angular.module('AppController', []).controller('AppController', function ($scope, $location, AuthenticationService) {
    $scope.greeting = "Welcome!";

    var vm = this;

    vm.isLoggedIn = AuthenticationService.isLoggedIn();

    vm.currentUser = AuthenticationService.currentUser();


    $scope.appViewChange = function(view){
      console.log(view);
      $location.path(view);
    };
    console.log(vm.isLoggedIn);
    console.log(vm.currentUser);

  
});