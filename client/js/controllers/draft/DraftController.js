angular.module("DraftController", []).controller("DraftController", function ($state, $stateParams, AuthenticationService, LeagueService, DraftService, DraftFactory) {
    let vm = this;

    vm.message = "";

    vm.onClock = "";

    vm.currentUser = AuthenticationService.currentUser().then((response) => {
        vm.currentUser = response;
    });

    vm.availablePlayers = [];
    vm.currentDraft = DraftService.getDraft().then((response) => {
        draftSort(response.data.draft, response.data.players);
    });

    vm.draftPlayer = (player_id) => {
        let draftPick = {
            position: vm.onClock.position,
            player_id: player_id
        };
        return DraftService.draftPlayer(draftPick).then((response) => {

            $state.reload();
        }, (error) => {
            console.log(error);
        });
    };

    let draftSort = (draft, players) => {
        let sortedDraft = [];
        let sorted = false;
        let x = 0;
        while (sorted == false) {
            for (let y = 0; y < draft.field.length; y++) {
                if (draft.field[y].picks[x]) {
                    sortedDraft.push({ _id: draft.field[y].picks[x]._player });
                }
                else {
                    vm.onClock = draft.field[y];
                    sorted = true;
                    break;
                }
            }
            x++;
            if (sorted == false) {
                for (let z = 9; z >= 0; z--) {
                    if (draft.field[z].picks[x]) {
                        sortedDraft.push({ _id: draft.field[z].picks[x]._player });
                    }
                    else {
                        vm.onClock = draft.field[z];
                        sorted = true;
                        break;
                    }
                }
                x++;
            }
        }

        for (let p = 0; p < players.length; p++) {
            for (let d = 0; d < sortedDraft.length; d++) {
                if (players[p]._id == sortedDraft[d]._id) {
                    sortedDraft[d].displayName = players[p].displayName;
                    sortedDraft[d].team = players[p].team;
                    sortedDraft[d].position = players[p].position;
                    players.splice(p, 1);
                }
            }
        }
        vm.draft = sortedDraft;
        vm.availablePlayers = players;

    };
});