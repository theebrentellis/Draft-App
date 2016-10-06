angular.module('AppController', []).controller('AppController', function ($scope, $location, AuthenticationService, UserFactory) {
    $scope.greeting = "Welcome!";

    var vm = this;

    vm.isLoggedIn = AuthenticationService.isLoggedIn();

    vm.currentUser = AuthenticationService.currentUser();


    $scope.appViewChange = function(view){
      if(vm.isLoggedIn === true){
          $location.path(view);
      }
      else{
        $location.path("/login");
      }
      
    };

    $scope.currentUserLogOut = function(){
      AuthenticationService.currentUserLogOut();
      if(!AuthenticationService.isLoggedIn()){
        $location.path("/login");
      }
    };

    $scope.deleteAllUsers = function(){
      UserFactory.deleteAllUsers();
      $location.path("/login");
    };
});