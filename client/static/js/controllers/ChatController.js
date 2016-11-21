angular.module('ngEnter', []).directive('ngEnter', function ($scope, element, attrs) {

    element.bind("keypress", function (event) {
        if (event.which === 13) {
            $scope.$apply(function () {
                $scope.$eval(attrs.ngEnter);
            });
            event.preventDefault();
        }
    });
});

angular.module('ChatController', []).controller('ChatController', function ($scope, AuthenticationService, LeagueService, ChatFactory) {

    var vm = this;

    vm.currentUser = AuthenticationService.currentUser();

    vm.currentLeague = LeagueService.currentLeague();

    vm.messages = [];

    vm.message = "";
    vm.filterText = "";

    
    var socket = io.connect();

    socket.on("pastMessages", function (data) {
        $scope.$apply(function(){
            vm.messages = data.reverse();
        });
    });

    socket.on("receiveMessage", function(data){
        $scope.$apply(function(){
            vm.messages.unshift(data);
        });
    });

    vm.sendMessage = function () {
        // var chatMessage = {
        //     "_id": vm.currentLeague.chat._id,
        //     "userName": vm.currentUser.firstName,
        //     "message": vm.message
        // };
        LeagueService.postMessage(vm.message, function (result, err) {
            if (err) {
                window.alert("Error!");
            }
            // else{
            //     socket.emit("receiveMessage", result);
            //     vm.message = "";
            // }
        });
    };
});