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
            websiteService.findWebsiteById(vm.websiteId).then(
                function (res) {
                    vm.website = res.data;
                }
            );
        }
        init();

        function updateWebsite(website) {
            websiteService.updateWebsite (vm.websiteId, website).then(function () {
                $location.url("/user/" + vm.userId + "/website/");
            });
        }

        function deleteWebsite() {
            websiteService.deleteWebsite(vm.websiteId);
            $location.url('/user/'+vm.userId+'/website/');
        }
    }
})();