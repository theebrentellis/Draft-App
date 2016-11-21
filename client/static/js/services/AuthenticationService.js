angular.module('AuthenticationService', []).service('AuthenticationService', function ($window, $state, $rootScope, $location, $q, UserFactory) {
  var service = {};

  var saveToken = function (token) {
    $window.localStorage['user-token'] = token;
  };

  var getToken = function () {
    return $window.localStorage['user-token'];
  };

  service.isLoggedIn = function () {
    var token = getToken();
    var payload;

    if (token) {
      payload = token.split('.')[1];
      payload = $window.atob(payload);
      payload = JSON.parse(payload);

      return payload.exp > Date.now() / 1000;
    }else {
      return false;
    }
  };

  service.currentUser = function () {
    if (service.isLoggedIn()) {
      var token = getToken();
      var payload = token.split('.')[1];

      payload = $window.atob(payload);
      payload = JSON.parse(payload);

      return {
        _id: payload._id,
        userName: payload.userName,
        firstName: payload.firstName,
        leagues: payload.leagues
      };
    }
  };

  service.updateToken = function (token) {
    $window.localStorage.removeItem('user-token');
    saveToken(token);
  };

  service.register = function (user, callback) {
    UserFactory.register(user, function (data) {
      if (data.token) {
        saveToken(data.token);
        callback('Success');
      }
      if (data.message) {
        callback(data.message);
      }else {
        callback('Unknown Error!');
      }
    });
  };

  service.login = function (user) {
    return UserFactory.login(user)
      .then(function (response) {
        if (response.data.token) {
          saveToken(response.data.token);
          return 'Success';
        }else {
          return response.data.message;
        }
      }, function (err) {
        console.log(err);
      });
  };

  service.currentUserLogOut = function () {
    $window.localStorage.clear();
    $rootScope = $rootScope.$new(true);
    $location.path("/login");
  };

  service.deleteAllUsers = function () {
    UserFactory.deleteAllUsers();
    $window.localStorage.clear();
    $rootScope = $rootScope.$new(true);
    $location.path("/login");
  };
  // service.currentUserLogOut();

  return service;
});
