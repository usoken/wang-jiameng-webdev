(function () {
    angular
        .module('WebAppMaker')
        .controller('WidgetListController', WidgetListController)
        .controller('NewWidgetController', NewWidgetController)
        .controller('EditWidgetController', EditWidgetController);

    function EditWidgetController($routeParams, $location, widgetService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;
        vm.widgetId = $routeParams.widgetId;

        function init() {
            vm.widget = widgetService.findWidgetById(vm.widgetId);
            vm.wigetType=vm.widget.widgetType;
        }
        init();


    }

    function NewWidgetController() {

    }


    function WidgetListController($sce, $routeParams, WidgetService) {

        var vm = this;

        vm.trustThisContent = trustThisContent;
        vm.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        vm.getWidgetUrlForType = getWidgetUrlForType;


        function init() {
            vm.userId = $routeParams.userId;
            vm.websiteId = $routeParams.websiteId;
            vm.pageId = $routeParams.pageId;
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
        }
        init();


        function getWidgetUrlForType(type) {
            return 'views/widget/templates/widget-'+type.toLowerCase()+'.view.client.html';
        }

        function getYouTubeEmbedUrl(youTubeLink) {
            var embedUrl = 'https://www.youtube.com/embed/';
            var youTubeLinkParts = youTubeLink.split('/');
            var id = youTubeLinkParts[youTubeLinkParts.length - 1];
            embedUrl += id;
            console.log(embedUrl);
            return $sce.trustAsResourceUrl(embedUrl);

            //https://www.youtube.com/embed/AM2Ivdi9c4E
        }

        function trustThisContent(html) {
            // diligence to scrub any unsafe content
            return $sce.trustAsHtml(html);
        }
    }
})();