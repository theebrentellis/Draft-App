angular.module("ChatFactory", []).factory("ChatFactory", function($http){

    var factory = {};

    factory.postMessage = function(message, callback){
        $http.post("/message", message).success(function(data, status){
            callback(data, false);
        })
        .error(function(data, status){
            callback(data, true);
        });
    };

    factory.deleteAllChat = function(){
        $http.post("/deleteAllChat").success(function(data){
            console.log(data);
        });
    };

    return factory;
});