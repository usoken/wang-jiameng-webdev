
(function () {
    angular
        .module('WebAppMaker')
        .controller('WebsiteListController', WebsiteListController);

    function WebsiteListController($location,$routeParams, websiteService) {

        var vm = this;
        vm.userId = $routeParams['uid'];

        function init() {
            websiteService.findWebsitesByUser(vm.userId).then(
              function (data) {
                  vm.websites = data;
              }
            );
        }
        init();
    }
})();