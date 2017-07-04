angular.module('UserController', []).controller('UserController', function($scope, $q, $view, $location, $state, AuthenticationService, LeagueService){
    var vm = this;

    vm.currentUser = AuthenticationService.currentUser();

    vm.currentLeague = LeagueService.currentLeague();

    vm.message = "";

    vm.loginView = true;
    vm.registerView = false;

    vm.userViewChange = function(view){
        if(view === true){
            vm.loginView = false;
            vm.registerView = true;
        }
        else{
            vm.loginView = true;
            vm.registerView = false;
        }
    };

    vm.registerInfo = {
        email: "",
        userName: "",
        firstName: "",
        password: ""
    };

    vm.loginInfo = {
        email: "",
        password: ""
    };

    vm.registerNew = function(){
        AuthenticationService.register(vm.registerInfo, function(data){
            if(data === "Success"){
                $location.path("/dashboard");
            }
            else{
                vm.message = data;
            }     
        });
    };

    vm.login = function(){
       return AuthenticationService.login(vm.loginInfo)
           .then(function (response) {
               if (response == "Success") {
                   $location.path('/dashboard');
                    // let theUser = AuthenticationService.currentUser();
                    // if(theUser.leagues[0] === undefined){
                    //     $location.path("/commish");
                    // }
                    // else{
                    //     $q.when(LeagueService.setCurrentLeagueId(theUser.leagues[0]._id))
                    //         .then(function(){
                    //             return LeagueService.getLeague()
                    //                 .then(function(response){
                    //                     $location.path("/availablePlayers");
                    //                 }, function(error){
                    //                     console.log(error);
                    //                 });
                    //         }, function(error){
                    //             console.log(error);
                    //         });
                    // }             
                }
                else{
                    vm.message = response;
                    console.log(response);
                }
           }, function (error) {
               vm.message = "Error: " + error.status;
                console.log(error);
            });
    };

    function onSignIn(googleUser){
        console.log("Fired onSign In");
        if(googleUser){
            var profile = googleUser.getBasicProfile();
            console.log("Email: " + profile.getEmail());
        }
    }

});

