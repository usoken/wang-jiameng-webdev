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
            pageService.findPagesByWebsiteId(vm.websiteId).then(
                function (data) {
                    vm.pages = data;
        });
        }

        init();
    }

    function NewPageController($routeParams, $location, pageService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.createPage = createPage;

        function init() {
            pageService.findPagesByWebsiteId(vm.websiteId).then(
                function (data) {
                    vm.pages = data;
                });
        }
        init();

        function createPage(page) {

            var website = {
                _id : (new Date()).getTime()+"",
                name:vm.name,
                websiteId:vm.websiteId

            };
            pageService.createPage(vm.websiteId, page);
            $location.url('/user/'+vm.userId+'/website/'+ vm.websiteId + '/page');
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
            pageService.findPageById(vm.pageId).then(
                function (res) {
                    vm.page = res.data;
                }
            );
        }
        init();

        function updatePage(page) {
            pageService.updatePage(vm.pageId, page).then(function () {
                $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/');
            });
        }

        function deletePage() {
            pageService.deletePage(vm.pageId).then(function () {
                $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/');
            });
        }
    }

})();