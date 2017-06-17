(function () {
    angular
        .module('WebAppMaker')
        .controller('LoginController', LoginController);

    function LoginController($location, userService) {
        var vm = this;
        vm.login = function (username, password) {
            userService
                .login(username,password)
                .then(login, handleError);

            function handleError(error) {
                vm.message= "Username " + username + " not found, please try again";
            }

            function login(found) {
                if (found) {
                    $location.url("/profile");
                } else {
                    vm.message = "Username " + username + " not found, please try again";
                }
            }
        }
    }
})();
