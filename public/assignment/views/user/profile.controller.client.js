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
            userService.findUserById(userId).then(function (res) {
                model.user = res.data;
            });
        }
        init();

        function updateUser() {
            userService.updateUser(model.userId, model.user).then(
                function() {
                    model.error = "Updated";
                }
            );
        }
        
        function deleteUser() {
            userService.deleteUser(model.userId);
                $location.url("/");

        }


    }
})();