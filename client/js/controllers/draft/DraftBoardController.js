angular.module("DraftBoardController", []).controller("DraftBoardController", function ($state, $stateParams, AuthenticationService, LeagueService, DraftService) {
    let vm = this;

    vm.message = ""

    let getDraftField = DraftService.draftField();
    getDraftField.then((field) => {
        vm.draftField = field;
    });
});