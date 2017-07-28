angular.module('UserRegisterController', []).controller('UserRegisterController', function ($state, AuthenticationService) {
    let vm = this;

    vm.message = "";

    vm.registerInfo = {
        email: "",
        userName: "",
        firstName: "",
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

    vm.dismissError = () => {
        vm.message = "";
    };
});