angular.module('AuthenticationService', []).service('AuthenticationService', function ($window, $state, $rootScope, $q, UserFactory) {
  let service = {};

  const tokenStorage = {
    setToken: (key, token) => {
      return Promise.resolve().then(() => {
        $window.localStorage.setItem(key, token);
      });
    },
    getToken: (key) => {
      return Promise.resolve().then(() => {
        return $window.localStorage.getItem(key);
      });
    },
    removeToken: (key) => {
      return Promise.resolve().then(() => {
        $window.localStorage.removeItem(key);
      });
    }
  }

  service.isLoggedIn = () => {
    return tokenStorage.getToken('user-token')
      .then((token) => {
        if (token) {
          let payload = token.split('.')[1];
          payload = $window.atob(payload);
          payload = JSON.parse(payload);
          return payload.exp > Date.now() / 1000;
        }
        else {
          return false;
        }
      }, (error) => {
        console.log(error);
      });
  };

  service.currentUser = function () {
    return service.isLoggedIn()
      .then((response) => {
        if (response){
          return tokenStorage.getToken('user-token')
            .then((token) => {
              let payload = token.split('.')[1];
              payload = $window.atob(payload);
              payload = JSON.parse(payload);

              return {
                _id: payload._id,
                userName: payload.userName,
                firstName: payload.firstName,
                email: payload.email,
                leagues: payload.leagues
              };
            }, (error) => {
              console.log(error);
            });
        }
      }, (error) => {
        console.log(error);
      });
  };

  service.updateToken = function (token) {
    return tokenStorage.removeToken('user-token')
      .then(() => {
        return tokenStorage.setToken('user-token', token)
          .then(() => {
            return "Token Set!";
          }, (error) => {
            console.log(error);
          })
      }, (error) => {
        console.log(error);
      });
  };

  service.register = function (user, callback) {
    return UserFactory.register(user)
      .then((response) => {
        if (response.data.token) {
          return tokenStorage.setToken('user-token', response.data.token)
            .then(() => {
              return "Token Set!";
            });
        }
        else if (response.message) {
          return reponse.message;
        }
        // else {
        //   callback('Unknown Error!');
        // }
      }, (error) => {
        console.log(error);
      });
  };

  service.login = function (user) {
    return UserFactory.login(user)
      .then(function (response) {
        if (response.data.token) {
          return tokenStorage.setToken('user-token', response.data.token)
            .then(() => {
              return "Token Set!"
            }, (error) => {
              console.log(error);
            });
        } else {
          if (response.status == 401) {
            return "Incorrect Username or Password!";
          }
          else {
            return "Unknown Error!"
          }
        }
      }, function (err) {
        console.log(err);
      });
  };

  service.currentUserLogOut = function () {
    $window.localStorage.clear();
    $rootScope = $rootScope.$new(true);
    // $location.path("/");
    console.log("Logout");
  };

  service.deleteAllUsers = function () {
    UserFactory.deleteAllUsers();
    $window.localStorage.clear();
    $rootScope = $rootScope.$new(true);
    $location.path("/login");
  };

  return service;
});
