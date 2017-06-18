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

        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            websiteService.findWebsiteById(vm.websiteId).then(
                function (data) {
                    vm.website = data;
                }
            );
        }
        init();

        function updateWebsite(website) {
            if (website.name === null || website.name === "" || website.name === undefined) {
                vm.message = "Website Name required";
            }
            else {
                websiteService.updateWebsite (vm.websiteId, website);
                $location.url("/user/" +  vm.userId + "/website/");
            }

        }

        function deleteWebsite() {
            websiteService.deleteWebsite(vm.websiteId);
            $location.url('/user/'+vm.userId+'/website/');
        }
    }
})();