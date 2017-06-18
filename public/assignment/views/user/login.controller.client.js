(function () {
    angular
        .module('WebAppMaker')
        .controller('LoginController', LoginController);

    function LoginController($location, userService) {
        var vm = this;
        vm.passwordCheck =  true;

        vm.login = function (username, password) {

            if (password === undefined) {
                vm.passwordCheck = false;
            }
            if (username === undefined && password === undefined) {
                vm.passwordCheck =  false;
            }

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
