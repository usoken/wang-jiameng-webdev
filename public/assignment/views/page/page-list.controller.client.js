(function () {
    angular
        .module('WebAppMaker')
        .controller('PageListController', PageListController)
        .controller('NewPageController', NewPageController)
        .controller('EditPageController', EditPageController);

    function PageListController($routeParams, pageService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];

        function init() {
            vm.pages = pageService.findPagesByWebsiteId(vm.websiteId);
        }

        init();
    }

    function NewPageController($routeParams, $location, pageService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.createPage = createPage;

        function init() {
            vm.pages = pageService.findPagesByWebsiteId(vm.websiteId);
        }
        init();

        function createPage(page) {
            pageService.createPage(vm.websiteId, page);
            $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/');
        }
    }

    function EditPageController($routeParams, $location, pageService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            vm.page = pageService.findPageById(vm.pageId);
        }
        init();

        function updatePage() {
            var result = pageService.updatePage(vm.pageId, vm.page);
            $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/');
        }

        function deletePage() {
            pageService.deletePage(vm.pageId);
            $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/');
        }
    }

})();