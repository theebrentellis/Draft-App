angular.module('LeagueController', []).controller('LeagueController', function ($scope, $q, $confirm, $location, $state, AuthenticationService, LeagueService) {

    let vm = this;

    vm.currentUser = {};
    let getCurrentUser = AuthenticationService.currentUser();
    getCurrentUser.then((response) => {
        vm.currentUser = response;
    }, (error) => {
        console.log(error);
    });
    
    // vm.currentLeague = {};
    // let getCurrentLeague = LeagueService.currentLeague();
    // getCurrentLeague.then((response) => {
    //     vm.currentLeague = reponse;
    // }, (error) => {
    //     console.log(error);
    //     });
    
    vm.moveFocus = (nextId) => {
        $('#' + nextId).focus();
    };
    // vm.createNewLeague = function () {
    //     var newLeagueInfo = {
    //         "leagueName": vm.newLeague.leagueName,
    //         "leagueSize": vm.newLeague.leagueSize,
    //         "user_id": vm.currentUser._id
    //     };
    //     return LeagueService.createNewLeague(newLeagueInfo)
    //         .then((response) => {
    //             $state.transitionTo('dashboard');
    //         }, (error) => {
    //             console.log(error);
    //         });
    // };

    // vm.joinLeague = function () {
    //     let code = "";
    //     for (var x in vm.data) {
    //         code += vm.data[x];
    //     }
    //     return LeagueService.joinLeague(code)
    //         .then((response) => {
    //             $state.transitionTo('dashboard');
    //         }, (error) => {
    //             console.log(error);
    //         });
    // };

});