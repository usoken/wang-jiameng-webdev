(function () {
    angular
        .module('WebAppMaker')
        .controller('WebsiteEditController', WebsiteEditController);

    function WebsiteEditController($routeParams,
                                   websiteService,
                                   $location) {

        var vm = this;
        vm.userId = $routeParams['userId'];
        vm.websiteId = $routeParams.websiteId;


        // event handlers
        vm.createWebsite = createWebsite;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            vm.websites = websiteService.findWebsitesByUser(vm.userId);
            vm.website = websiteService.findWebsiteById(vm.websiteId);
        }
        init();

        // implementation
        function createWebsite(website) {
            website.developerId = vm.userId;
            websiteService.createWebsite(website);
            $location.url('/user/'+vm.userId+'/website');
        }

        function updateWebsite(website) {
            WebsiteService. updateWebsite (vm.websiteId, website);
        }

        function deleteWebsite(websiteId) {
            websiteService.deleteWebsite(vm.websiteId);
            $location.url('/user/'+vm.userId+'/website');
        }
    }
})();