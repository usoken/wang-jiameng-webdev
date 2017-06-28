(function () {
    angular
        .module('ProjectMaker')
        .controller('LoginController', LoginController)
        .controller('RegisterController', RegisterController)
        .controller('ProfileController', ProfileController);

    function LoginController($location, UserService) {

        var vm = this;
        vm.passwordCheck =  true;

        vm.login = function (username, password) {

            if(username == "admin" && password==="admin") {
                $location.url('/admin/');
            }
            else {
                if (password === undefined) {
                    vm.passwordCheck = false;
                }
                if (username === undefined && password === undefined) {
                    vm.passwordCheck =  false;
                }
                UserService
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
    }




    function ProfileController($location, $routeParams, UserService, currentUser) {

        var vm = this;
        var userId = $routeParams['uid'];
        vm.user = currentUser;
        var userId = currentUser._id;

        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.logout = logout;

        function init() {
        }
        init();

        function updateUser() {
            UserService
                .updateUser(vm.user._id, vm.user)
                .then(function () {
                    vm.error = "Updated"
                });
        }

        function deleteUser() {
            UserService
                .deleteUser(vm.user._id)
                .then(function () {
                    $location.url("/login/");
                });
        }

        function logout() {
            UserService.logout().then(function (res) {
                $location.url("/login/");
            })
        }
    }

    function RegisterController($location, UserService) {

        var vm = this;

        vm.register = register;

        function register(username, password, confirmPassword) {

            if (username === undefined || password === null || confirmPassword === undefined){
                vm.error = "You can't leave this empty";
            }

            else {
                if(password !== confirmPassword) {
                    vm.error = "Passwords must match";
                }

                else {

                    UserService.findUserByUsername(username).then(
                        function (data) {
                            var found = data;
                            if(found !== null) {
                                vm.error = "Username has been taken";
                            }
                            else {
                                var user = {
                                    username: username,
                                    password: password
                                };
                                UserService
                                    .register(user)
                                    .then(function (user) {
                                        $location.url("/profile");
                                    });

                            }

                        }
                    );

                }
            }

        }
    }

})();