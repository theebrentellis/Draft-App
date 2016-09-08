
angular.module('UserFactory', []).factory('UserFactory', function ($http) {
  var factory = {};

  // var user = null;

  // factory.isLoggedIn = function(){
  //   if(user){
  //     return true;
  //   }
  //   else{
  //     return false;
  //   }
  // },

  // factory.getUserStatus = function(){
  //   return user;
  // },

  // factory.login = function(loginInfo, callback){
  //   console.log(loginInfo);
  //   $http.post("/login", loginInfo).success(function(user){
  //     console.log("Success!!!");
  //     callback(user);
  //   })
  //   .error(function(res){
  //     console.log(res);
  //   });
  // }

  factory.register = function(registerInfo, callback){
    $http.post("/register", loginInfo).success(function(data){
      callback(data);
    });
  };

  factory.login = function(loginInfo, callback){
    $http.post("/login", loginInfo).success(function(data){
      callback(data);
    });
  };

  return factory;
});