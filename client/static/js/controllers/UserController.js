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
        if(view == true){
            registerViewChange();
        }
        else{
            loginViewChange();
        }
        // $scope.loginView = false;
        // $scope.registerView = true;
    }

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
        // .error(function(err){
        //     alert(err);
        // })
        // .then(function(){
        //     $location.path("availablePlayers");
        // });
    };

    vm.login = function(){
        console.log(vm.loginInfo);
        AuthenticationService.login(vm.loginInfo).error(function(err){
            alert(err);
        })
        .then(function(){
            $location.path("availablePlayers")
        });
    };
});

