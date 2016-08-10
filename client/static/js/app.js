var DraftApp = angular.module("DraftApp", ["ngRoute", "ngMessages", "PlayerController", "AppController", "DraftFactory"]);

DraftApp.config(function($routeProvider){
    $routeProvider
    .when("/", {
        templateUrl: "/client/index.html"
        // controller: "AppController"
    });
    // .when("/commish", {
    //     templateUrl: "/client/static/partials/commish.html",
    //     controller: "PlayerController"
    // })
    // .when("/availablePlayers", {
    //     templateUrl: "/client/static/partials/availablePlayers.html",
    //     controller: "PlayerController"
    // })
    // .when("/draftBoard", {
    //     templateUrl: "/client/static/partials/draftBoard.html",
    //     controller: "PlayerController"
    // })
    // .otherwise({
	// 	redirectTo: '/'
	// });

    // $locationProvider.html5Mode(true);
});

angular.module('ngView', []).directive("ngView", ["$route", "$compile", "$controller", function($route, $compile, $controller){
    return{
        terminal: true,
        priority: 400,
        transclude: "element",
        compile: function(element, attr, linker){
            return function(scope, $element, attr){
                var currentElement;

                $scope.$on("$routeChangeSuccess", update);
                update();


                function update(){
                    var locals = $route.current && $route.current.locals,
                        templateUrl = locals && locals.$templateUrl;

                    if(template){
                        var newScope = scope.$new();

                        linker(newScope, function(clone){
                            clone.html(template);
                            $element.parent().append(clone);

                            if(currentElement){
                                currentElement.remove();
                            }

                            var link = $compile(clone.contents()),
                                current = $route.current;
                            
                            currentElement = clone;
                            current.scope = newScope;

                            if(current.controller){
                                locals.$scope = newScope;
                                var controller = $controller(current.controller, locals);
                                clone.data("$ngControllerController", controller);
                                clone.children().data("ngControllerController", controller);
                            }

                            link(newScope);
                            newScope.$emit("$viewContentLoaded");
                        });
                    }else{

                    }
                }
            }
        }
    };
}]);