angular.module('LoginController', []).controller('LoginController', function($scope, $rootScope, LoginEvents, LoginFactory){
    var vm = this;

    vm.user = null;
    vm.saveUser = saveUser;
    vm.deleteUser = deleteUser;

    initController();

    function initController(){
      LoginFactory.GetCurrent().thne(function(user){
        vm.user = user;
      });
    }

    function saveUser(){
        LoginFactory.update(vm.user)
            .then(function(){
                FlashFactory.Success("User Updated");
            })
            .catch(function(error){
                FlashFactory.Error(error);
            });
    }

    function deleteUser(){
        LoginFactory.Delete(vm.user._id)
            .then(function(){
                FlashFactory.Success("User Updated");
            })
            .catch(function(error){
                FlashFactory.Error(error)
            });
    }
});

