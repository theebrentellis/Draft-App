angular.module('DraftService', []).service('DraftService', function ($window, $state, DraftFactory, AuthenticationService, LeagueService) {
    let service = {};

    let socket = io.connect();

    const draftStorage = {
        setDraft: (id, draft) => {
            return Promise.resolve().then(() => {
                $window.sessionStorage.setItem(id, draft);
            });
        },
        getDraft: (id) => {
            return Promise.resolve().then(() => {
                return $window.sessionStorage.getItem(id);
            });
        },
        removeDraft: () => {
            return Promise.resolve().then(() => {
                $window.sessionStorage.removeItem(id);
            });
        }
    };

    service.getDraft = ($stateParams) => {
        return DraftFactory.getDraft($stateParams)
            .then((response) => {
                return draftStorage.setDraft("draft", JSON.stringify(response.data))
                    .then(() => {
                        return
                        // console.log("Done");
                    }, (error) => {
                        console.log(error);
                    });
            }, (error) => {
                console.log(error);
            });
    };

    service.startDraft = () => {

        //Gets League from LeagueService
        return LeagueService.getLeague().then((response) => {

            //Checks if any teams have not been assigned a draft pick
            for (let x = 0; x < response.teams.length; x++) {
                if (!response.teams[x].pick) {
                    return { error: "Please Assign All Picks" };
                }
            }
            //Sets the field for a new draft
            let draftField = [];
            for (let x = 1; x <= response.size; x++) {
                let position = { position: x };
                response.teams.forEach((team) => {
                    if (team.pick == x) {
                        position._user = team._user._id;
                    }
                });
                draftField.push(position);
            }

            let newDraftObject = {};
            newDraftObject.teams = draftField;

            return DraftFactory.startDraft(newDraftObject)
                .then((response) => {
                    return LeagueService.getLeague()
                        .then((response) => {
                            return response;
                        }, (error) => {
                            console.log(error);
                        });
                }, (error) => {
                    console.log(error);
                });
        }, (error) => {
            console.log(error);
        });
    };

    service.joinDraft = () => {
        let getCurrentLeague = LeagueService.getLeague();
        getCurrentLeague.then((response) => {
            //Get draft object from league.draft_id
        });
    };

    service.onClock = () => {
        return draftStorage.getDraft('draft').then((draft) => {
            let pDraft = JSON.parse(draft);
            return pDraft.onClock;
        }, (error) => {
            console.log(error);
        });
    };

    service.availablePlayers = () => {
        return draftStorage.getDraft('draft').then((draft) => {
            let pDraft = JSON.parse(draft);
            return pDraft.availablePlayers;
        }, (error) => {
            console.log(error);
        });
    };

    service.draftList = () => {
        return draftStorage.getDraft('draft').then((draft) => {
            let pDraft = JSON.parse(draft);
            let sortedDraft = [];
            let sorted = false;
            let x = 0;
            while (sorted == false) {
                for (let y = 0; y < pDraft.draft.field.length; y++) {
                    if (pDraft.draft.field[y].picks[x]) {
                        sortedDraft.push(pDraft.draft.field[y].picks[x]._player);
                    }
                    else {
                        sorted = true;
                        break;
                    }
                }
                x++;
                if (sorted == false) {
                    for (let z = pDraft.draft.field.length - 1; z >= 0; z--) {
                        if (pDraft.draft.field[z].picks[x]) {
                            sortedDraft.push(pDraft.draft.field[z].picks[x]._player);
                        }
                        else {
                            sorted = true;
                            break;
                        }
                    }
                    x++;
                }
            }
            return sortedDraft;
        }, (error) => {
            console.log(error);
        });
    };

    service.draftPlayer = (draftPick) => {
        
        return DraftFactory.draftPlayer(draftPick)
            .then((response) => {
                socket.emit("successfulPick");
                return response;
            }, (error) => {
                console.log(error);
            });
    };

    service.downloadPlayers = function () {
        DraftFactory.downloadPlayers();
    };

    socket.on("updateDraft", function() {
        $state.reload();
    });

    return service;
});