(function () {
    angular
        .module('WebAppMaker')
        .controller('ProfileController', ProfileController);

    function ProfileController(userService, $routeParams) {

        var vm = this;
        var userId = $routeParams["userId"];
        function init() {
            vm.user = userService.findById(vm.userId);
        }
        init();
    }
})();