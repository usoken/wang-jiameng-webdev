(function () {
    angular
        .module('WebAppMaker')
        .controller('ProfileController', ProfileController);

    function ProfileController($location, $routeParams, userService, currentUser) {
        var vm = this;
        var userId = $routeParams['uid'];
        vm.user = currentUser;
        var userId = currentUser._id;

        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.logout = logout;

        function init() {
            // userService
            //     .findUserById(userId)
            //     .then(function (res) {
            //         vm.user = res.data;
            //     });
        }
        init();

        function updateUser() {
            userService
                .updateUser(vm.user._id, vm.user)
                .then(function () {
                    vm.error = "Updated"
                });
        }

        function deleteUser() {
            userService
                .deleteUser(vm.user._id)
                .then(function () {
                    $location.url("/login/");
                });
        }
        
        function logout() {
            userService.logout().then(function (res) {
                $location.url("/login/");
            })
        }
    }
})();
