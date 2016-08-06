angular.module("DraftFactory", []).factory("DraftFactory", function($http){
    var factory = {};

    var drafted = [];

    factory.getAll = function(data){
        console.log(data);
        $http.post("/getAll", data);
    };

    // factory.draft = function(info, callback){
    //     $http.post("/draft").success(function(output){
    //         callback();
    //     });
    // };
    return factory;
});