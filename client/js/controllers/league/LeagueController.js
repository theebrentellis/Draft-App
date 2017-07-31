angular.module('LeagueController', []).controller('LeagueController', function ($rootScope, $scope, $q, $view, $uibModal, $confirm, $location, $state, AuthenticationService, LeagueService, DraftService) {

    let vm = this;

    vm.message = "";

    //Current User
    vm.currentUser = {};
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
        return;
        // createPicksList(response);
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
        // console.log("Start Draft");
        let startLeagueDraft = DraftService.startDraft();
        startLeagueDraft.then((response) => {
            console.log(response);
            if (response.error) {
                vm.message = response.error;
            }
        }, (error) => {
            console.log(error);
        });
        // return DraftService.startDraft()
        //     .then((response) => {
        //         console.log(response);
        //     }, (error) => {
        //         console.log(error);
        //     });
    };
});