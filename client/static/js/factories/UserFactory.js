
angular.module('UserFactory', []).factory('UserFactory', function ($http) {
  var factory = {};

  factory.register = function(registerInfo, callback){
    $http.post("/register", registerInfo).success(function(data){
      callback(data);
    });
  };

  factory.login = function(loginInfo, callback){
    $http.post("/login", loginInfo).success(function(data){
      callback(data);
    });
  };

  factory.deleteAllUsers = function(callback){
    $http.post("/deleteAllUsers").success(function(data){
      console.log(data);
      callback(data);
    });
  };

  return factory;
});