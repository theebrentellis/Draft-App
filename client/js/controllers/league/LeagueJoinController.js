angular.module('LeagueJoinController', []).controller('LeagueJoinController', function($q, $rootScope, $scope, $state, AuthenticationService, LeagueService) {
    let vm = this;

    vm.message = "";

    //Current User
    vm.currentUser = {};
    let getCurrentUser = AuthenticationService.currentUser();
    getCurrentUser.then((response) => {
        vm.currentUser = response;
        return;
    }, (error) => {
        console.log(error);
    });

    //Join League
    vm.joinLeague = () => {
        let code = "";
        for (var x in vm.data) {
            code += vm.data[x];
        }
        let leaguePack = {
            "user_id": vm.currentUser._id,
            "league_code": code,
        };
        return LeagueService.joinLeague(leaguePack)
            .then((response) => {
                if (response.data.message) {
                    vm.message = response.data.message;
                    
                }
                else {
                    $state.transitionTo('dashboard');
                }

            }, (error) => {
                console.log(error);
            });
    };
    
    //Moves Focus After Input
    vm.moveFocus = (nextId) => {
        $('#' + nextId).focus();
    };

    vm.dismissError = () => {
        vm.message = "";
    };
});