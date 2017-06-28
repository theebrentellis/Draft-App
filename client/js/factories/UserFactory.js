angular.module('UserFactory', []).factory('UserFactory', function ($http, $q) {
  var factory = {};

  factory.register = function(registerInfo, callback){
    $http.post("/register", registerInfo).success(function(data){
      callback(data);
    });
  };

  factory.login = function(loginInfo){
   return $http.post("/login", loginInfo)
      .then(function(data){
        return data;
      });
  };

  factory.deleteAllUsers = function(callback){
    $http.post("/deleteAllUsers").success(function(data){
      console.log(data);
      callback(data);
    });
  };

  factory.getUserLeague = function(callback){
    $http.get("/getUserLeagues").success(function(data){
      console.log(data);
      callback(data);
    });
  };

  return factory;
});