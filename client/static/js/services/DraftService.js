angular.module('DraftService', []).service('DraftService', function ($window, $state, $q, DraftFactory, AuthenticationService, LeagueService) {
    var service = {};

    var vm = this;

    vm.currentUser = AuthenticationService.currentUser();

    vm.isLoggedIn = AuthenticationService.isLoggedIn();

    vm.currentLeague = LeagueService.currentLeague();

    service.isOnClock = function(){
        if(vm.currentLeague.onClock === vm.currentUser._id){
            return true;
        }
        else{
            return false;
        }
    };

    service.draftPlayer = function(draftPackage){
        return DraftFactory.draftPlayer(draftPackage)
            .then(function(response){
                if(response.statusText === "OK"){
                    return true;
                }
                else{
                    return false;
                }
            }, function(error){
                console.log(error);
            });
    };

    service.downloadPlayers = function(){
        DraftFactory.downloadPlayers();
    };

    service.deleteAllChat = function(){
        ChatFactory.deleteAllChat();
    };

    service.deleteAllPlayers = function(callback){
        DraftFactory.deleteAllPlayers(function(data){
            callback(data);
        });
    };

    service.undraftedPlayers = function () {

    };

    service.draftedPlayers = function () {

    };

    return service;
});