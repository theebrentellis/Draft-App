angular.module('UserController', []).controller('UserController', function($scope, $q, $view, $location, $state, AuthenticationService, DraftService){
    var vm = this;

    vm.currentUser = AuthenticationService.currentUser();

    vm.currentLeague = DraftService.currentLeague();

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
       return AuthenticationService.login(vm.loginInfo)
            .then(function(response){
                if(response == "Success"){
                    theUser = AuthenticationService.currentUser();
                    if(theUser.leagues[0] === undefined){
                        $location.path("/commish");
                    }
                    else{
                        DraftService.setCurrentLeagueId(theUser.leagues[0]._id);
                        DraftService.getLeague();
                        $location.path("availablePlayers")
                    }             
                }
                else{
                    vm.message = response;
                    console.log(response);
                }
            }, function(error){
                console.log(error);
            });
    };
});

