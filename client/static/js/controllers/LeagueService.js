angular.module("LeagueService", []).service("LeagueService", function(AuthenticaionService, DraftService){
    var service = {};

    var vm = this;

    vm.currentUser = AuthenticaionService.currentUser();
    vm.isLoggedIn = AuthenticaionService.isLoggedIn();

    


    return service;
});