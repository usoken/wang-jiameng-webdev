(function () {
    angular
        .module('WebAppMaker')
        .controller('ProfileController', ProfileController);

    function ProfileController($location, userService, $routeParams) {

        var model = this;
        var userId = $routeParams['uid'];

        model.user = userService.findUserById(userId);
        function init() {
            model.user = userService.findUserById(userId);
            console.log(userId);
        }
        init();

    }
})();