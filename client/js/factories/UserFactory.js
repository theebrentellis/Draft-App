angular.module('UserFactory', []).factory('UserFactory', function ($http) {
  let factory = {};

  factory.register = (registerInfo) => {
    return $http.post("/register", registerInfo)
      .then((response) => {
        return response;
      }, (error) => {
        console.log(error);
        return error;
    });
  };

  factory.login = (loginInfo) => {
    return $http.post("/login", loginInfo)
      .then((response) => {
        return response;
      }, (error) => {
        console.log(error);
        return error;
      });
  };

  return factory;
});