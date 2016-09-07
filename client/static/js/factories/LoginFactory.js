
angular.module('LoginFactory', []).factory('LoginFactory', function ($http, $q) {
  var factory = {};

  factory.getCurrent = function(callback){
    $http.get("loginGetCurrent").success(function(data){
      callback(data);
    });
  };

  factory.getAll = function(callback){
    $http.get("loginGetAll").success(function(data){
      callback(data);
    });
  };

  factory.getById = function(id, callback){
    $http.get("loginGetById/"+id).success(function(data){
      callback(data);
    });
  };

  factory.getByUsername = function(username, callback){
    $http.get("loginGetByUsername/"+username).success(function(data){
      callback(data);
    });
  };

  factory.create = function(userInfo, callback){
    $http.post("loginCreate", userInfo).success(function(data){
      callback(data);
    });
  };

  factory.update = function(userInfo, callback){
    $http.put("loginUpdate"+ userInfo).success(function(data){
      callback(data);
    });
  };

  factory.remove = function(_id, callback){
    $http.delete("loginDelete/" + _id).success(function(data){
      callback(data);
    });
  };

  return factory;
});