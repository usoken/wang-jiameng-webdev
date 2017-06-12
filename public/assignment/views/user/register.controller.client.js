(function () {
    angular
        .module('WebAppMaker')
        .controller('RegisterController', RegisterController);

    function RegisterController($location, userService) {

        var vm = this;

        vm.register = register;

        function register(username, password, confirmPassword) {

            if (username === undefined && password === undefined && confirmPassword === undefined){
                vm.error = "You can't leave this empty";
            }

            else {
                if(password !== confirmPassword) {
                    vm.error = "Passwords must match";
                }

                else {
                    var found = userService.findUserByUsername(username).then(
                        function (data) {
                            var found = data;
                            if(found !== null) {
                                vm.error = "Username has been taken";
                            } else {
                                var user = {
                                    username: username,
                                    password: password
                                };
                                userService
                                    .createUser(user)
                                    .then(function (res) {
                                        $location.url("/user/" + res.data._id);
                                    });

                            }

                        }
                    );

                }
            }

        }
    }
})();