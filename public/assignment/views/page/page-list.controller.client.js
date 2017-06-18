(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("EditPageController", EditPageController)
        .controller("NewPageController", NewPageController);

    function EditPageController($routeParams, $location, pageService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];

        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            pageService
                .findPageById(vm.pageId)
                .then(function (page) {
                    vm.page = page;
                });
        }

        init();

        function updatePage() {
            if (vm.page.name === null || vm.page.name === "" || vm.page.name === undefined) {
                vm.message = "Page Name required";
            }
            else {
            pageService.updatePage(vm.pageId, vm.page);
            $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/');
        }}

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
            pageService
                .findPagesByWebsiteId(vm.websiteId)
                .then(function (pages) {
                    vm.pages = pages;
                });
        }

        init();
    }

    function NewPageController($routeParams, $location, pageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams['wid'];

        vm.createPage = createPage;

        function init() {
            pageService
                .findPagesByWebsiteId(vm.websiteId)
                .then(function (pages) {
                    vm.pages = pages;
                });
        }

        init();

        function createPage(name, title) {
            if (name === "" || name === null || name === undefined) {
                vm.message = "Page Name required";
            }
            else {
                var newPage = {
                    _website: vm.websiteId,
                    name: name,
                    title: title
                };

                pageService.createPage(vm.websiteId, newPage);
                $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/');
            }
        }
    }
})();