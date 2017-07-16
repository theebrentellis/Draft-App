angular.module('DashboardController', []).controller('DashboardController', function ($scope, $q, $location, $view, $state, AuthenticationService) {
    let vm = this;

    vm.currentUser = {};
    let getCurrentUser = AuthenticationService.currentUser();
    getCurrentUser.then((response) => {
        vm.currentUser = response;
    }, (error) => {
        console.log(error);
    });

});