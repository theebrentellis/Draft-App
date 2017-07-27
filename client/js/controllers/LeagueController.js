angular.module('LeagueController', []).controller('LeagueController', function ($rootScope, $scope, $q, $view, $uibModal, $confirm, $location, $state, AuthenticationService, LeagueService) {

    let vm = this;

    vm.message = "";

    vm.leagueAvailablePicks = false;

    //Current User
    // vm.currentUser = {};
    let getCurrentUser = AuthenticationService.currentUser();
    getCurrentUser.then((response) => {
        vm.currentUser = response;
        return response;
    }, (error) => {
        console.log(error);
    });

    //Current League
    vm.league = {};
    let getLeague = LeagueService.getLeague();
    getLeague.then((response) => {
        vm.league = response;
        createPicksList(response);
    }, (error) => {
        console.log(error);
    });

    //Commish Auth
    vm.isCommish = (userID, league) => {
        let commish = false;
        if (userID && league) {
            league.forEach((element) => {
                if (element == userID) {
                    commish = true;
                }
            });
            return commish;
        }
        return commish;
    };

    vm.leaguePickMaker = [];

    //League Teams
    let createPicksList = (league) => {
        if (league) {
            let draftOrder = { title: "Draft Order", teams: [] };
            let size = league.size;
            let currentTeams = league.teams;
            for (let x = 1; x <= size; x++) {
                let draftPick = { 'pick': x };
                // angular.forEach(currentTeams, (team, index) => {
                //     if (team.pick == x) {
                //         draftPick = team;
                //         currentTeams.splice(index, 1);
                //     }
                // });
                currentTeams.forEach((team, index) => {
                    if (team.pick == x) {
                        draftPick = team;
                        currentTeams.splice(index, 1);
                    }
                });
                draftOrder.teams.push(draftPick);
            }
            vm.leaguePickMaker.push(draftOrder);
            if (currentTeams.length > 0) {
                let teams = { title: "Needs Pick", teams: [] };
                currentTeams.forEach((team) => {
                    teams.teams.push(team);
                });
                vm.leaguePickMaker.push(teams);
            }
        }
    };
    
    $scope.onDrop = function (srcList, srcIndex, targetList, targetIndex) {
        // Copy the item from source to target.
        targetList.splice(targetIndex, 0, srcList[srcIndex]);
        // Remove the item from the source, possibly correcting the index first.
        // We must do this immediately, otherwise ng-repeat complains about duplicates.
        if (srcList == targetList && targetIndex <= srcIndex) srcIndex++;
        srcList.splice(srcIndex, 1);
        for (let x = 0; x < targetList.length; x++){
            if (targetList[x]._id == this.team._id) {
                let team = this.team;
                let pick = x + 1;
                return updatePick(team, pick).then(() => {
                    return true;
                }, (error) => {
                    console.log(error);
                });
            }
        }
        // By returning true from dnd-drop we signalize we already inserted the item.
        return true;
    };

    let updatePick = (team, pick) => {
        let pickPack = {
            pick: pick,
            team: team
        };
        return LeagueService.updateTeamPick(pickPack)
            .then((response) => {
                $state.reload();
                return;
            }, (error) => {
                console.log(error);
            });
    };

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
                if (response == "League Joined") {
                    $state.transitionTo('dashboard');
                }
                else {
                    vm.message = response;
                }

            }, (error) => {
                console.log(error);
            });
    };
    vm.moveFocus = (nextId) => {
        $('#' + nextId).focus();
    };

    //Open New League Message Modal
    vm.newMessage = () => {
        $scope.modalInstance = $uibModal.open({
            animation: true,
            size: "lg",
            templateUrl: 'newMessageModal.html',
            controller: 'LeagueController',
            controllerAs: 'vm',
            scope: $scope,
            backdrop: "static",
        });
    };
    vm.sendMessage = () => {
        let messagePack = {
            "leagueID": vm.league._id,
            "userID": vm.currentUser._id,
            "message": vm.newLeagueMessage
        };

        return LeagueService.newLeagueMessage(messagePack)
            .then((response) => {
                console.log(response);
                if (response.statusText == "OK") {
                    $state.reload();
                }
                console.log(response);
            }, (error) => {
                console.log(error);
            });
    };
    vm.cancel = () => {
        $scope.modalInstance.dismiss('cancel');
    };
    vm.dismissError = () => {
        vm.message = "";
    };

    vm.startDraft = () => {
        console.log("Start Draft");
    }
});