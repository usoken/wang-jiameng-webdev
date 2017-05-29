(function () {
    angular
        .module('WebAppMaker')
        .controller('PageListController',PageListController)
        .controller('NewPageController',NewPageController)
        .controller('EditPageController', EditPageController);
    
    function PageListController($routeParams, PageService) {
        var vm = this;
        function  init() {
            vm.userId = $routeParams.userId;
            vm.websiteId = $routeParams.websiteId;
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }
        init();
    }

    function NewPageController() {

    }

    function EditPageController($routeParams,
                                PageService,
                                $location) {
        var vm = this;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        function init() {
            vm.pageId = PageService.findPageById($routeParams.pageId);
        }
        init();
        
        function updatePage(name) {
            
        }

        function deletePage() {

        }


        
    }
})();