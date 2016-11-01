angular.module('AuthenticationService', []).service('AuthenticationService', function ($window, $state, UserFactory) {

    var service = {};

    var saveToken = function(token){
        $window.localStorage["user-token"] = token;
    };

    var getToken = function(){
        return $window.localStorage["user-token"];
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
                _id: payload._id,
                userName: payload.userName,
                firstName: payload.firstName,
                leagues: payload.leagues,         
            };
        }
    };

    service.updateToken = function(token){
        $window.localStorage.removeItem("user-token");
        saveToken(token.token);
        service.isLoggedIn();
        $state.reload();
        return "Success!";
        
    };

    service.register = function(user, callback){
        UserFactory.register(user, function(data){
            if(data.token){
                saveToken(data.token);
                $state.reload();
                callback("Success");
            }
            if(data.message){
                callback(data.message);
            }
            else{
                callback("Unknown Error!");
            }
        });
    };

    service.login = function(user, callback){
        UserFactory.login(user, function(data){
            if(data.token){
                saveToken(data.token);
                $state.reload();
                callback("Success");
            }
            if(data.message){
                callback(data.message);
            }
            else{
                callback("Unknown Error");
            }
        });
    };

    service.currentUserLogOut = function(){
        $window.localStorage.clear();
        $state.reload();
        console.log($window.localStorage);
    };

return service;
});