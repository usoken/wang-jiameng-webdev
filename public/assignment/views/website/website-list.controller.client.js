(function () {
    angular
        .module('WebAppMaker')
        .controller('WebsiteListController', WebsiteListController);

    function WebsiteListController($routeParams, websiteService) {

        var vm = this;
        vm.userId = $routeParams['userId'];

        function init() {
            vm.websites = websiteService.findWebsitesByUser(vm.userId);
        }
        init();
    }
})();