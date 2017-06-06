(function () {
    angular
        .module('WebAppMaker')
        .controller('WebsiteNewController', WebsiteNewController);

    function WebsiteNewController($routeParams,
                                  websiteService,
                                  $location) {

        var model = this;
        model.userId = $routeParams['uid'];
        model.createWebsite = createWebsite;

        function init() {
            websiteService.findWebsitesByUser(model.userId).then(
                function (data) {
                    model.websites = data;
                }
            )
        }
        init();

        function createWebsite(name) {
            var website = {
                _id : (new Date()).getTime(),
                name:name,
                developerId:model.userId

            };
            websiteService.createWebsite(model.userId, website);
            $location.url('/user/'+model.userId+'/website/');
        }
    }
})();