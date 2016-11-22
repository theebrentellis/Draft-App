angular.module('AppController', []).controller('AppController', function ($scope, $location, $q, AuthenticationService, DraftService, LeagueService) {

    var vm = this;

    vm.isLoggedIn = AuthenticationService.isLoggedIn();

    vm.currentUser = AuthenticationService.currentUser();

    vm.currentLeague = LeagueService.currentLeague();

    //Changes Views
    vm.appViewChange = function(view){
      if(vm.isLoggedIn === true){
        if(view == "/availablePlayers" | view == "/draftBoard" | "/chat"){
          $location.path(view);
        }
        else{
          $location.path(view);
        }  
      }
      else{
        $location.path("/login");
      }
    };

    //Sets A League and Returns League Info
    vm.setCurrentLeague = function(leagueId){
      return LeagueService.setCurrentLeagueId(leagueId)
        .then(function(){
          return LeagueService.getLeague()
            .then(function(){
              $location.path("/availablePlayers");
            }, function(error){
              console.log(error);
            });
        }, function(error){
          console.log(error);
        });
    };

    //Sets Current League To Bold
    vm.setColor = function(league){
      var currentLeague = LeagueService.currentLeague();
      console.log(league._id);
      console.log(currentLeague._id);
      if(currentLeague._id === league._id){
        return {"font-weight": "bold"};
      }
    };


    //Dev Tools (Not For Production)
    vm.deleteAllDBs = function(){
      DraftService.deleteAllPlayers();
      AuthenticationService.deleteAllUsers();
      LeagueService.deleteAllChat();
      DraftService.deleteAllDrafts();
    };
    vm.downloadPlayers = function(){
      DraftService.downloadPlayers(function(data){
        console.log(data);
      });
    };
    vm.deleteAllPlayers = function(){
      DraftService.deleteAllPlayers(function(data){
        console.log(data);
      });
    };
    vm.deleteAllUsers = function(){
      AuthenticationService.deleteAllUsers();
      $location.path("/login");
    };
    vm.deleteAllChat = function(){
      LeagueService.deleteAllChat();
    };
    vm.deleteAllLeagues = function(){
      LeagueService.deleteAllLeagues();
    };
    vm.deleteAllDrafts = function(){
      DraftService.deleteAllDrafts();
    };
    vm.currentUserLogOut = function(){
      AuthenticationService.currentUserLogOut();
    };
});