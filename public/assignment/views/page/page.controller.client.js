(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("EditPageController", EditPageController)
        .controller("NewPageController", NewPageController);

    function EditPageController($routeParams, $location, pageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            vm.pages = pageService.findAllPagesForUser(vm.websiteId);
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

    function PageListController($routeParams, pageService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];

        function init() {
            vm.pages = pageService.findAllPagesForUser(vm.websiteId);
        }
        init();
    }

    function NewPageController($routeParams, $location, pageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams['wid'];
        vm.createPage  = createPage;
        function init() {
            vm.pages = pageService.findAllPagesForUser(vm.websiteId);
            vm.page = pageService.findPagesByWebsiteId(vm.websiteId);
        }
        init();

        function createPage(name, title) {
            var newPage = {
                _id: (new Date()).getTime(),
                name: name,
                websiteId: vm.websiteId,
                title: title
            };
            pageService.createPage(vm.userId, newPage);
            $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/');
        }
    }
})();