angular.module('UserController', []).controller('UserController', function ($scope, $q, $view, $location, $state, AuthenticationService, LeagueService) {
    let vm = this;

    vm.currentUser = {};
    let getCurrentUser = AuthenticationService.currentUser();
    getCurrentUser.then((response) => {
        vm.currentUser = response;
    }, (error) => {
        console.log(error);
    });

    vm.currentLeague = LeagueService.league;

    vm.message = "";

    vm.tab = 1;

    vm.setTab = function (tabId) {
        vm.tab = tabId;
    };

    vm.isSet = function (tabId) {
        return vm.tab === tabId;
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

    vm.registerNew = function () {
        return AuthenticationService.register(vm.registerInfo)
            .then((response) => {
                $state.transitionTo('dashboard');
            }, (error) => {
                console.log(error);
            });
    };

    vm.login = function () {
        return AuthenticationService.login(vm.loginInfo)
            .then(function (response) {
                if (response == "Token Set!") {
                    $state.transitionTo('dashboard');
                }
                else {
                    vm.message = response;
                }
            }, function (error) {
                vm.message = "Error: " + error.status;
                console.log(error);
            });
    };

    vm.onSignIn = (googleUser) => {
        console.log("Fired onSign In");
        if (googleUser) {
            var profile = googleUser.getBasicProfile();
            console.log("Email: " + profile.getEmail());
        }
    };
    
    vm.dismissError = () => {
        vm.message = "";
    }

});

