angular.module("DraftFactory", []).factory("DraftFactory", function($http){
    var factory = {};

    var drafted = [];

    factory.getAll = function(callback){
        $http.get("/getAll").success(function(output){
            list = output;
            callback(list);
        });
    };

    factory.draft = function(info, callback){
        $http.post("/draft").success(function(output){
            callback();
        });
    };
    return factory;
});