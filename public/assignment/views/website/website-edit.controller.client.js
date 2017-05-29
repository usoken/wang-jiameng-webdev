(function () {
    angular
        .module('WebAppMaker')
        .controller('WebsiteEditController', WebsiteEditController);

    function WebsiteEditController($routeParams,
                                   websiteService,
                                   $location) {

        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];


        // event handlers
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            vm.websites = websiteService.findWebsitesByUser(vm.userId);
            vm.website = websiteService.findWebsiteById(vm.websiteId);
        }
        init();

        function updateWebsite() {
            websiteService.updateWebsite (vm.websiteId, vm.website);
            $location.url("/user/" + vm.userId + "/website/");
        }

        function deleteWebsite() {
            websiteService.deleteWebsite(vm.websiteId);
            $location.url('/user/'+vm.userId+'/website/');
        }
    }
})();