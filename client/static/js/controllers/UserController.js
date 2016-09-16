angular.module('UserController', []).controller('UserController', function($scope, $location, AuthenticationService, UserFactory){
    var vm = this;

    $scope.loginView = true;
    $scope.registerView = false;

    $scope.userViewChange = function(view){
        function registerViewChange(){
            $scope.loginView = false;
            $scope.registerView = true;
        }
        function loginViewChange(){
            $scope.loginView = true;
            $scope.registerView = false;
        }
        if(view === true){
            registerViewChange();
        }
        else{
            loginViewChange();
        }
    };

    vm.registerInfo = {
        userName: "",
        firstName: "",
        password: ""
    };

    vm.loginInfo = {
        userName: "",
        password: ""
    };

    vm.registerNew = function(){
        AuthenticationService.register(vm.registerInfo, function(token){
            $location.path("/availablePlayers");
        });
    };

    vm.login = function(){
        console.log(vm.loginInfo);
        AuthenticationService.login(vm.loginInfo, function(token){
            $location.path("/availablePlayers");
        });
    };
});

