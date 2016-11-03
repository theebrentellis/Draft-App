angular.module('AuthenticationService', []).service('AuthenticationService', function ($window, $state, $rootScope, $location, $q, UserFactory) {

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

    // service.login = function(user, callback){
    //     UserFactory.login(user, function(data){
    //         if(data.token){
    //             saveToken(data.token);
    //             callback("Success");
    //         }
    //         if(data.message){
    //             callback(data.message);
    //         }
    //         else{
    //             callback("Unknown Error");
    //         }
    //     });
    // };

    service.login = function(user){
        UserFactory.login(user)
            .then(function(data){
            if(data.data.token){
                console.log(data.data.token);
            }
            else{
                console.log(data);
                console.log("No Token");
            }
        }, function(err){
            console.log(err);
        });
            // .then(function(data){
                
            //     console.log("Working?!");
            //     return data;
            // });
            // .then(function(data){
            //     console.log("First Response");
            //     return data;
            // }, function(data){
            //     console.log("Second Response");
            //     return data;
            // });
    };

    service.currentUserLogOut = function(){
        $window.localStorage.clear();
        $rootScope.clear();
        console.log($window.localStorage);
    };

    service.deleteAllUsers = function(){
        UserFactory.deleteAllUsers();
    };

return service;
});