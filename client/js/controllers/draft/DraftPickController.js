angular.module("DraftPickController", []).controller("DraftPickController", function ($state, $stateParams, AuthenticationService, LeagueService, DraftService) {
    let vm = this;

    vm.message = "";

    vm.sortType = 'displayName';
    vm.sortReverse = false;
    vm.searchPlayer = "";
    vm.filterPosition = "";

    let getOnClock = DraftService.onClock();
    getOnClock.then((team) => {
        vm.onClock = team;
    }, (error) => {
        console.log(error);
    });

    let getAvailablePlayers = DraftService.availablePlayers();
    getAvailablePlayers.then((players) => {
        vm.availablePlayers = players;
    }, (error) => {
        console.log(error);
    });

    let getDraftList = DraftService.draftList();
    getDraftList.then((draft) => {
        vm.draft = draft;
    }, (error) => {
        console.log(error);
        });
    
    vm.draftPlayer = (player_id) => {
        let draftPick = {
            position: vm.onClock.position,
            player_id: player_id
        };
        return DraftService.draftPlayer(draftPick).then((response) => {
            return;
            // $state.reload();
        }, (error) => {
            console.log(error);
        });
    };
});