angular.module("DraftController", []).controller("DraftController", function ($rootScope, $state, _draft, $stateParams, AuthenticationService, LeagueService, DraftService) {
    let vm = this;

    vm.params = $stateParams;

    vm.message = "";

    vm.sortType = 'displayName';
    vm.sortReverse = false;
    vm.searchPlayer = "";
    vm.filterPosition = "";

    vm.currentUser = AuthenticationService.currentUser().then((response) => {
        vm.currentUser = response;
    });

    let getOnClock = DraftService.onClock();
    getOnClock.then((team) => {
        vm.onClock = team;
    }, (error) => {
        console.log(error);
    });
});