angular.module('LeagueController', []).controller('LeagueController', function ($scope, $q, $confirm, $location, $state, AuthenticationService, LeagueService) {

    var vm = this;

    vm.allLeagues = [];

    vm.currentUser = {};
    let getCurrentUser = AuthenticationService.currentUser();
    getCurrentUser.then((response) => {
        vm.currentUser = response;
    }, (error) => {
        console.log(error);
    });

    vm.currentLeague = LeagueService.currentLeague();

    vm.createNewLeagueView = false;
    vm.findLeagueView = false;

    // var getAllLeagues = function(){
    //     return LeagueService.getAllLeagues()
    //         .then(function(leagues){
    //             vm.allLeagues = leagues;
    //         }, function(error){
    //             console.log(error);
    //         });
    // };

    // var getUserLeague = function(id){
    //     LeagueService.getUserLeague(id, function(league){
    //     });
    // };

    // vm.leagueViewChange = function(view){
    //     if(view === "createNew"){
    //         vm.createNewLeagueView = true;
    //         vm.findLeagueView = false;
    //     }
    //     if(view === "findLeague"){
    //         return getAllLeagues()
    //             .then(function(){
    //                 vm.findLeagueView = true;
    //                 vm.createNewLeagueView = false;
    //             }, function(error){
    //                 console.log(error);
    //             });


    //     }
    // };

    vm.createNewLeague = function () {
        var newLeagueInfo = {
            "leagueName": vm.newLeague.leagueName,
            "leagueSize": vm.newLeague.leagueSize,
            "user_id": vm.currentUser._id
        };
        LeagueService.createNewLeague(newLeagueInfo);
    };

    vm.joinLeague = function () {
        let code = "";
        for (var x in vm.data) {
            code += vm.data[x];
        }
        return LeagueService.joinLeague(code)
            .then((response) => {
                $state.transitionTo('dashboard');
            }, (error) => {
                console.log(error);
            });
    };

});