angular.module('ngEnter', []).directive('ngEnter', function ($scope, element, attrs) {

    element.bind("keypress", function (event) {
        console.log(this);
        if (event.which === 13) {
            $scope.$apply(function () {
                $scope.$eval(attrs.ngEnter);
            });
            event.preventDefault();
        }
    });
});
angular.module('DraftChatController', []).controller('DraftChatController', function ($scope, AuthenticationService, LeagueService, DraftService) {

    var vm = this;

    vm.messages = [];

    vm.message = "";
    vm.filterText = "";

    
    // var socket = io.connect();

    // socket.on("pastMessages", function (data) {
    //     $scope.$apply(function(){
    //         vm.messages = data.reverse();
    //     });
    // });

    // socket.on("receiveMessage", function(data){
    //     $scope.$apply(function(){
    //         vm.messages.unshift(data);
    //     });
    // });

    vm.sendMessage = () => {
        var chatMessage = {
            "_id": vm.currentLeague.chat._id,
            "userName": vm.currentUser.firstName,
            "message": vm.message
        };
        console.log(chatMessage);
        // LeagueService.postMessage(vm.message, function (result, err) {
        //     if (err) {
        //         window.alert("Error!");
        //     }
        //     // else{
        //     //     socket.emit("receiveMessage", result);
        //     //     vm.message = "";
        //     // }
        // });
    };
});
