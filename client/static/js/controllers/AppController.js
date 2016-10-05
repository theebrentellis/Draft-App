angular.module('AppController', []).controller('AppController', function ($scope, $location, AuthenticationService) {
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
      console.log("Fired!");
      AuthenticationService.currentUserLogOut();
    };
});