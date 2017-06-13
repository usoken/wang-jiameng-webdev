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

        function createWebsite(name, description) {
            var website = {
                _user:model.userId,
                name:name,
                description: description
            };
            websiteService.createWebsite(model.userId, website);
            $location.url('/user/'+model.userId+'/website/');

        }
    }
})();