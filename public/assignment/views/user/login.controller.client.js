(function() {
    angular
        .module('WebAppMaker')
        .controller('LoginController', LoginController);

    function LoginController ($location, userService) {
        var vm = this;
        vm.login = function (username, password) {
            userService.findUserByCredentials(username, password).then(login);
            function login(found) {
                if(found !== "0") {
                    $location.url('/user/' + found._id);
                } else {
                    vm.message = "Username " + username + " not found, please try again";
                }
            }
        };
    }
})();




