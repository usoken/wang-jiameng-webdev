
(function () {
    angular
        .module('WebAppMaker')
        .controller('WebsiteListController', WebsiteListController);

    function WebsiteListController($location,$routeParams, websiteService) {

        var model = this;
        model.userId = $routeParams['uid'];

        function init() {
            model.websites = websiteService.findWebsitesByUser(model.userId);
        }
        init();
    }
})();