(function () {
    angular
        .module('WebAppMaker')
        .controller('RegisterController', RegisterController);

    function RegisterController($location, userService) {

        var vm = this;

        vm.register = register;

        function register(username, password, confirmPassword) {
            if (username == undefined) {
                vm.error = "Invalid username";
            }

            else if(password !== confirmPassword) {
                vm.error = "Passwords must match";
            }

            else if(password === undefined) {
                vm.error = "Invalid password";
            }
            else {
                var found = userService.findUserByUsername(username);

                if(found !== null) {
                    model.error = "Username is not available";
                } else {
                    var user = {
                        username: username,
                        password: password
                    };

                    userService.createUser(user);
                    $location.url('/user/' + user._id);
                }
            }
        }
    }
})();