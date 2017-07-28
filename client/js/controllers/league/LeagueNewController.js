angular.module('LeagueNewController', []).controller('LeagueNewController', function ($q, AuthenticationService, LeagueService) {
    let vm = this;

    vm.messsage = "";

    //Current User
    vm.currentUser = {};
    let getCurrentUser = AuthenticationService.currentUser();
    getCurrentUser.then((response) => {
        vm.currentUser = response;
        return;
    }, (error) => {
        console.log(error);
    });

    //Create New League
    vm.createNewLeague = () => {
        let newLeagueInfo = {
            "leagueName": vm.newLeague.leagueName,
            "leagueSize": vm.newLeague.leagueSize,
            "user_id": vm.currentUser._id
        };

        return LeagueService.createNewLeague(newLeagueInfo)
            .then((response) => {
                $state.transitionTo('dashboard');
            }, (error) => {
                console.log(error);
            });
    };
})