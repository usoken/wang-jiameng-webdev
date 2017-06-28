(function () {
    angular.module('ProjectMaker').controller('adminController', adminController)
        .controller('adminEditController',adminEditController);

    function adminController(UserService,$routeParams) {
        var vm=this;
        vm.userId=$routeParams.userId;
        vm.createUser = createUser;
        vm.deleteUser=deleteUser;
        
        function init() {
            UserService.findAllUsers().then(function (response) {
                vm.allusers = response.data;
            })
        }
        init();

        function createUser() {
            UserService.createUser
        }
        function deleteUser(userId) {
            console.log(userId);
            UserService.deleteUser(userId).then(function (response) {
                init();
            },function (error) {
                vm.error = error.data;
            })
        }

    }

    function adminEditController(UserService,$routeParams,$location) {
        var vm=this;
        vm.userId=$routeParams.userId;
        vm.updateUser = updateUser;
        function init() {
            UserService.findUserById(vm.userId).then(function (response) {
                vm.user = response.data;
                console.log(vm.user);
            })
        }
        init();

        function updateUser() {
            UserService.updateUser(vm.userId, vm.user).then(function (response) {
                console.log(vm.user);
                vm.success = "Username is updated";
                $location.url("admin");
            })
        }

    }
})();