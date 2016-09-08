angular.module('UserController', []).controller('UserController', function($location, AuthenticationService, UserFactory){
    var vm = this;

    vm.registerInfo = {
        userName: "",
        firstName: "",
        password: ""
    };

    vm.loginInfo = {
        userName: "",
        password: ""
    };

    vm.registerNew = function(){
        AuthenticationService.register(vm.registerInfo).error(function(err){
            alert(err);
        })
        .then(function(){
            $location.path("availablePlayers");
        });
    };

    vm.login = function(){
        AuthenticationService.login(vm.loginInfo).error(function(err){
            alert(err);
        })
        .then(function(){
            $location.path("availablePlayers")
        });
    };

    
    // vm.saveUser = saveUser;
    // vm.deleteUser = deleteUser;

    // getCurrentUser();

    // function getCurrentUser(){
    //   LoginFactory.getCurrentUser(function(user){
    //       console.log(user);
    //       vm.user = user;
    //   });
    //   .success(function(user){
    //     vm.user = user;
    //   });
    // }

    // function saveUser(){
    //     LoginFactory.update(vm.user)
    //         .then(function(){
    //             FlashFactory.Success("User Updated");
    //         })
    //         .catch(function(err){
    //             FlashFactory.Error(err);
    //         });
    // }

    // function deleteUser(){
    //     LoginFactory.deleteUser(vm.user._id).success(function(){
    //         $window.location = "/login";
    //     })
    //     .error(function(err){
    //         FlashFactory.Error(err);
    //     });   
    // }
});

