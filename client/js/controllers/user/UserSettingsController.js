angular.module('UserSettingsController', []).controller('UserSettingsController', function (AuthenticationService) {
    let vm = this;

    vm.message = "";

    vm.currentUser = {};
    let getCurrentUser = AuthenticationService.currentUser();
    getCurrentUser.then((response) => {
        vm.currentUser = response;
    }, (error) => {
        console.log(error);
    });

    vm.tab = 1;

    vm.setTab = (tabId) => {
        vm.tab = tabId;
    };

    vm.isSet = (tabId) => {
        return vm.tab === tabId;
    };

    

    

    

    

    
    
    vm.dismissError = () => {
        vm.message = "";
    }

});

