angular.module("ChatService", []).service("ChatService", function ($stateParams, ChatFactory) {
    let service = {};

    let socket = io.connect();

    socket.on('updateMessages', function () {
        service.getMessages($stateParams);
    });

    service.getMessages = ($stateParams) => {
        return ChatFactory.getMessages((messages) => {
            return messages;
        }, (error) => {
            console.log(error);
        });
    };

    service.sendMessage = (message) => {
        ChatFactory.sendMessage(message);
    };

    return service;
});