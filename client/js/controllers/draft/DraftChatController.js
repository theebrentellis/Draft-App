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
angular.module('DraftChatController', []).controller('DraftChatController', function ($scope, AuthenticationService, LeagueService, DraftService, ChatService) {

    var vm = this;

    vm.messages = [];

    vm.message = "";
    vm.filterText = "";

    let getCurrentUser = AuthenticationService.currentUser();
    getCurrentUser.then((user) => {
        vm.currentUser = user;
    });
    
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
            "user_id": vm.currentUser._id,
            "message": vm.message
        };
        ChatService.sendMessage(chatMessage);
    };
});
