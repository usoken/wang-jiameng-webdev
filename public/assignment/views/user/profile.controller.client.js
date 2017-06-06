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
            userService.updateUser(model.user._id, model.user).then(
                function() {
                    model.error = "Updated";
                }
            );
        }
        
        function deleteUser() {
            userService.deleteUser(model.user._id).then(function () {
                $location.url("/login/");
            });

        }


    }
})();