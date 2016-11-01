angular.module('UserController', []).controller('UserController', function($scope, $location, AuthenticationService, UserFactory){
    var vm = this;

    vm.message = "";

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
        AuthenticationService.register(vm.registerInfo, function(data){
            if(data === "Success"){
                $location.path("/commish");
            }
            else{
                vm.message = data;
            }
            
        });
    };

    vm.login = function(){
        AuthenticationService.login(vm.loginInfo, function(data){
            if(data == "Success"){
                $location.path("/availablePlayers");
            }
            else{
                vm.message = data;
            }
            // if(AuthenticationService.isLoggedIn()){
            //     $location.path("/availablePlayers");
            // }
            // else{
            //     $location.path("/login");
            // }
            
        });
    };
});

