angular.module('DashboardController', []).controller('DashboardController', function ($scope, $view, $location, $state, AuthenticationService, LeagueService) {
    let vm = this;

    vm.currentUser = AuthenticationService.currentUser();

    vm.allLeagues = LeagueService.getAllLeagues();

    
});