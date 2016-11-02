angular.module('UserController', []).controller('UserController', function($scope, $q, $view, $location, $state, AuthenticationService, DraftService){
    var vm = this;

    vm.currentUser = AuthenticationService.currentUser();

    vm.message = "";

    vm.loginView = true;
    vm.registerView = false;

    vm.userViewChange = function(view){
        function registerViewChange(){
            vm.loginView = false;
            vm.registerView = true;
        }
        function loginViewChange(){
            vm.loginView = true;
            vm.registerView = false;
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
                console.log(vm.currentUser);
            }
            else{
                vm.message = data;
            }
        });
        DraftService.defaultCurrentLeague();
        console.log("Done!");
        

        // AuthenticationService.login(vm.loginInfo)
        //     .then(function(data){
        //         if(data === "Success"){
        //             $location.path("/availablePlayers");
        //             console.log(vm.currentUser);
        //         }
        //         else{
        //             console.log("Else Error!");
        //         }
        //     }, function(error){
        //         console.log("Error!");
        //     });
    };
});

