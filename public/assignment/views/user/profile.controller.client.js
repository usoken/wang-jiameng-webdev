(function () {
    angular
        .module('WebAppMaker')
        .controller('ProfileController', ProfileController);

    function ProfileController($location, userService, $routeParams) {

        var model = this;
        var userId = $routeParams['uid'];

        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        function init() {
            model.user = userService.findUserById(userId);
            console.log(userId);
        }
        init();

        function updateUser() {
            userService
        }
        
        function deleteUser() {

        }


    }
})();