angular.module('UserFactory', []).factory('UserFactory', function ($http, $q) {
  var factory = {};

  factory.register = function (registerInfo) {
    return $http.post("/register", registerInfo)
      .then((response) => {
        console.log(response);
        return response;
      }, (error) => {
        console.log(error);
        return error;
    });
  };

  factory.login = function (loginInfo) {
    return $http.post("/login", loginInfo)
      .then(function (response) {
        return response;
      }, (error) => {
        return error;
      });
  };

  factory.deleteAllUsers = function (callback) {
    $http.post("/deleteAllUsers").success(function (data) {
      console.log(data);
      callback(data);
    });
  };

  factory.getUserLeague = function (callback) {
    $http.get("/getUserLeagues").success(function (data) {
      console.log(data);
      callback(data);
    });
  };

  return factory;
});