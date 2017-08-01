angular.module('DraftService', []).service('DraftService', function ($window, $state, $q, DraftFactory, AuthenticationService, LeagueService) {
    let service = {};

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
        })
    };

    service.onClock = () => {

    };

    service.draftPlayer = function (draftPackage) {
        return DraftFactory.draftPlayer(draftPackage)
            .then(function (response) {
                if (response.statusText === "OK") {
                    return true;
                }
                else {
                    return false;
                }
            }, function (error) {
                console.log(error);
            });
    };

    service.downloadPlayers = function () {
        DraftFactory.downloadPlayers();
    };

    return service;
});