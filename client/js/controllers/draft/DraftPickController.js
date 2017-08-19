angular.module("DraftPickController", []).controller("DraftPickController", function ($confirm, $state, $stateParams, AuthenticationService, LeagueService, DraftService) {
    let vm = this;

    vm.message = "";

    vm.sortType = '';
    vm.sortReverse = false;
    vm.searchPlayer = "";
    vm.filterPosition = "";

    let getCurrentUser = AuthenticationService.currentUser();
    getCurrentUser.then((user) => {
        vm.currentUser = user;
    });

    let getLeague = LeagueService.getLeague();
    getLeague.then((league) => {
        vm.currentLeague = league;
    }, (error) => {
        console.log(error);
    });

    vm.isCommish = () => {
        vm.currentLeague.commish_id.forEach((id) => {
            if (id == vm.currentUser._id) return true;
        });
        return false
    }

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

    vm.positionFilter = (position) => {
        vm.sortType = '';
        if (position == vm.filterPosition) vm.filterPosition = ''
        else vm.filterPosition = position
    }

    vm.draftPlayer = (player) => {
        let draftPick = {
            position: vm.onClock.position,
            player_id: player._id
        };
        if (vm.currentUser._id == vm.onClock._id || vm.isCommish) {
            $confirm({ text: "Are you sure you want to draft " + player.displayName + "?", title: "Draft Player" }).then(() => {
                return DraftService.draftPlayer(draftPick).then((response) => {
                    return;
                    // $state.reload();
                }, (error) => {
                    console.log(error);
                });
            });
        }
    };
});