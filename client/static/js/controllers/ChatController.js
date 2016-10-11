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

angular.module('ChatController', []).controller('ChatController', function ($scope, AuthenticationService, ChatFactory) {

    var vm = this;

    vm.currentUser = AuthenticationService.currentUser();

    $scope.message = "";
    $scope.filterText = "";

    $scope.messages = [];

    var socket = io.connect();

    socket.on("pastMessages", function (data) {
        $scope.$apply(function(){
            $scope.messages = data.reverse();
        });
    });

    socket.on("receiveMessage", function(data){
        $scope.$apply(function(){
            $scope.messages.unshift(data);
        });
    });

    $scope.sendMessage = function () {
        var chatMessage = {
            "userName": vm.currentUser.userName,
            "message": $scope.message
        };
        ChatFactory.postMessage(chatMessage, function (result, err) {
            if (err) {
                window.alert("Error!");
            }
            else{
                socket.emit("receiveMessage", result);
                $scope.message = "";
            }
        });
    };
});