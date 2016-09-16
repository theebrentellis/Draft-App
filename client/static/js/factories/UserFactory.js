
angular.module('UserFactory', []).factory('UserFactory', function ($http) {
  var factory = {};

  factory.register = function(registerInfo, callback){
    $http.post("/register", registerInfo).success(function(data){
      callback(data);
    });
  };

  factory.login = function(loginInfo, callback){
    $http.post("/login", loginInfo).success(function(data){
      console.log("In User Factory");
      callback(data);
    });
  };

  return factory;
});