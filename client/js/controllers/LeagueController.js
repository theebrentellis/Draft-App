angular.module('LeagueController', []).controller('LeagueController', function ($rootScope, $scope, $q, $view, $uibModal, $confirm, $location, $state, $document, AuthenticationService, LeagueService) {

    let vm = this;

    //Current User
    vm.currentUser = {};
    let getCurrentUser = AuthenticationService.currentUser();
    getCurrentUser.then((response) => {
        vm.currentUser = response;
    }, (error) => {
        console.log(error);
    });

    //Current League
    vm.league = {};
    let getLeague = LeagueService.getLeague();
    getLeague.then((response) => {
        vm.league = response;
    }, (error) => {
        console.log(error);
    });

    //Commish Auth
    vm.isCommish = () => {
        if (vm.currentUser._id == vm.league.commish_id[0]) {
            return true;
        }
        else {
            return false;
        }
    }


    //Create New League
    vm.createNewLeague = function () {
        var newLeagueInfo = {
            "leagueName": vm.newLeague.leagueName,
            "leagueSize": vm.newLeague.leagueSize,
            "user_id": vm.currentUser._id
        };
        return LeagueService.createNewLeague(newLeagueInfo)
            .then((response) => {
                $state.transitionTo('dashboard');
            }, (error) => {
                console.log(error);
            });
    };

    //Join League
    vm.joinLeague = function () {
        let code = "";
        for (var x in vm.data) {
            code += vm.data[x];
        }
        return LeagueService.joinLeague(code)
            .then((response) => {
                $state.transitionTo('dashboard');
            }, (error) => {
                console.log(error);
            });
    };
    vm.moveFocus = (nextId) => {
        $('#' + nextId).focus();
    };

    //New League Message
    vm.newMessage = () => {
        console.log("New Message");
        // let parentElem = parentSelector ? angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        // console.log(parentElem)
        let modalInstance = $uibModal.open({
            animation: true,
            size: "lg",
            templateUrl: 'newMessageModal.html',
            // controller: 'LeagueController',
            // transclude: false,
            // backdrop: "static",
            // ariaLabelledBy: 'modal-title',
            // ariaDescribedBy: 'modal-body',
            // appendTo: "newMessageModal.html",
            // size: size
            // component: 'modalComponent',
            // resolve: {
            //     items: function () {
            //         return $ctrl.items;
            //     }
            // }
        });

        modalInstance.result.then(($view) => {
            console.log($view);
        }, () => {
            console.log()
        });

        modalInstance.opened.then(() => {
            console.log("Modal Open")
        });

        modalInstance.rendered.then(() => {
            console.log("Modal Rendered");
        });
    }
}).directive('modalBackdrop', ['$timeout', function ($timeout) {
    return {
        restrict: 'EA',
        replace: true,
        templateUrl: 'template/modal/backdrop.html',
        link: function (scope) {

            scope.animate = false;

            //trigger CSS transitions
            $timeout(function () {
                scope.animate = true;
            });
        }
    };
}]).directive('modalWindow', ['$modalStack', '$timeout', function ($modalStack, $timeout) {
    return {
        restrict: 'EA',
        scope: {
            index: '@',
            animate: '='
        },
        replace: true,
        transclude: true,
        templateUrl: function (tElement, tAttrs) {
            return tAttrs.templateUrl || 'template/modal/window.html';
        },
        link: function (scope, element, attrs) {
            element.addClass(attrs.windowClass || '');
            scope.size = attrs.size;

            $timeout(function () {
                // trigger CSS transitions
                scope.animate = true;
                // focus a freshly-opened modal
                element[0].focus();
            });

            scope.close = function (evt) {
                var modal = $modalStack.getTop();
                if (modal && modal.value.backdrop && modal.value.backdrop != 'static' && (evt.target === evt.currentTarget)) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    $modalStack.dismiss(modal.key, 'backdrop click');
                }
            };
        }
    };
}])
;