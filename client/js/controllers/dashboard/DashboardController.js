angular.module('DashboardController', []).controller('DashboardController', function (AuthenticationService, LeagueService) {
    let vm = this;

    vm.currentUser = AuthenticationService.currentUser().then((response) => {
        vm.currentUser = response;
        return LeagueService.getUserLeagues(response._id).then((leagues) => {
            vm.currentLeague = leagues.data
        }, (error) => {
            console.log(error);
        })
    }, (error) => {
        console.log(error);
    });
    
});