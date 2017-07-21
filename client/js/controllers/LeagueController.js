angular.module('LeagueController', []).controller('LeagueController', function ($rootScope, $scope, $q, $view, $uibModal, $confirm, $location, $state, $document, AuthenticationService, LeagueService) {

    let vm = this;

    vm.message = "";

    //Current User
    vm.currentUser = {};
    let getCurrentUser = AuthenticationService.currentUser();
    getCurrentUser.then((response) => {
        vm.currentUser = response;
    }, (error) => {
        console.log(error);
    });

    //Current League
    vm.league = {};
    let getLeague = LeagueService.getLeague();
    getLeague.then((response) => {
        vm.league = response;
    }, (error) => {
        console.log(error);
    });

    //Commish Auth
    vm.isCommish = () => {
        if (vm.currentUser._id == vm.league.commish_id[0]) {
            return true;
        }
        else {
            return false;
        }
    },

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
    vm.joinLeague = function () {
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

    //New League Message
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
    }
    vm.sendMessage = () => {
        let messagePack = {
            "leagueID": vm.league._id,
            "userID": vm.currentUser._id,
            "message": vm.newLeagueMessage
        };
        
        return LeagueService.newLeagueMessage(messagePack)
            .then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
            });
    }
    vm.cancel = () => {
        $scope.modalInstance.dismiss('cancel');
    }
    vm.dismissError = () => {
        vm.message = "";
    }
});