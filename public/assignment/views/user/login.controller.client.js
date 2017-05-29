(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)

        function  LoginController ($location, userService) {
            var vm = this;


            vm.login = function (username, password) {

                var found = userService.findUserByCredentials(username, password);

                if(found !== null) {
                    var id = found._id;
                    $location.url('/user/' + found._id);
                } else {
                    vm.message = "Username " + username + " not found, please try again";
                }
            };
        }
})();

