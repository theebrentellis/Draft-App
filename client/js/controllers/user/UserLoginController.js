angular.module('UserLoginController', []).controller('UserLoginController', function ($state, AuthenticationService) {
    let vm = this;

    vm.message = "";

    vm.loginInfo = {
        email: "",
        password: ""
    };

    vm.login = () => {
        return AuthenticationService.login(vm.loginInfo)
            .then((response) => {
                if (response == "Token Set!") {
                    $state.transitionTo('dashboard');
                }
                else {
                    vm.message = response;
                }
            }, (error) => {
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
    };
});