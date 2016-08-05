angular.module("PlayerController", []).controller("PlayerController", function($scope, DraftFactory){
    $scope.drafted_players = [];

    var getAll = function(){
        DraftFactory.getAll(function(data){
            $scope.drafted_players = data;
        });
    };
    getAll();

    $scope.draft = function(){
        console.log("In Client Controller Draft");
        console.log($scope.checkboxModel1);
        console.log($scope.checkboxModel);
        DraftFactory.draft($scope.drafted_player, function(){
            getAll();
        });
    };
});