angular.module('AuthenticationService', []).service('AuthenticationService', function ($http, $window, UserFactory) {

    var service = {};

    var saveToken = function(token){
        $window.localStorage["draft-token"] = token;
    };

    var getToken = function(){
        return $window.localStorage["draft-token"];
    };

    service.isLoggedIn = function(){
        var token = getToken();
        var payload;

        if(token){
            payload = token.split(".")[1];
            payload = $window.atob(payload);
            payload = JSON.parse(payload);

            return payload.exp > Date.now() / 1000;
        }
        else{
            return false;
        }
    };

    service.currentUser = function(){
        if(service.isLoggedIn()){
            var token = getToken();
            var payload = token.split(".")[1];

            payload = $window.atob(payload);
            payload = JSON.parse(payload);

            return {
                userName: payload.userName,
                firstName: payload.firstName
            };
        }
    };

    service.register = function(user){
        UserFactory.register(function(data){
            saveToken(data.token);
        });

    };

    service.login = function(user){
        UserFactory.login(function(data){
            saveToken(data.token);
        });
    };

    service.logout = function(){
        $window.localStorage.removeItem("draft-token");
    };

return service;

    // return {
    //     saveToken: saveToken,
    //     getToken: getToken,
    //     logout: logout
    // };
});