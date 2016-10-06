angular.module("FlashFactory", []).factory("FlashFactory", function($rootScope){
    var factory = {};

    factory.Success = Success;
    factory.Error = theError;

    initFactory();

    return factory;

    function initFactory(){
        $rootScope.$on("$locationChangeStart", function(){
            clearFlashMessage();
        });

        function clearFlashMessage(){
            var flash = $rootScope.flash;
            if(flash){
                if(!flash.keepAfterLocationChange){
                    delete $rootScope.flash;
                }
                else{
                    flash.keepAfterLocationChange = false;
                }
            }
        }
    }

    function Success(message, keepAfterLocationChange){
        $rootScope.flash = {
            message: message,
            type: "success",
            keepAfterLocationChange: keepAfterLocationChange
        };
    }

    function theError(message, keepAfterLocationChange){
        $rootScope.flash = {
            message: message,
            type: "danger",
            keepAfterLocationChange: keepAfterLocationChange
        };
    }
});