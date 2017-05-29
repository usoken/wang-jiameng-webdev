(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("WidgetChooserController", WidgetChooserController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($sce, $routeParams, widgetService) {
        var vm = this;
        vm.getHtml = getHtml;
        vm.getUrl = getUrl;

        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.widgetId = $routeParams['wgid'];

        function init() {
            vm.widgets = widgetService.findWidgetsByPageId(vm.pageId);
        }
        init();

        function getHtml(widget) {
            var html = $sce.trustAsHtml(widget.text);
            return html;
        }

        function getUrl(widget) {
            var urlParts = widget.url.split("/");
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }
    }

    function WidgetChooserController($location, $routeParams, widgetService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.widgetId = $routeParams['wgid'];
        vm.createWidget = createWidget;

        function init() {
            vm.widgets = widgetService.findWidgetsByPageId(vm.pageId);
        }
        init();

        function createWidget(widgetType) {
            var newWidget = {
                _id: (new Date()).getTime(),
                name: "",
                widgetType: widgetType,
                pageId: vm.pageId
            };
            widgetService.createWidget(vm.pageId, newWidget);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + newWidget._id);
        }
    }

    function EditWidgetController($location, $routeParams, widgetService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.widgetId = $routeParams['wgid'];
        vm.deleteWidget = deleteWidget;
        vm.updateWidget = updateWidget;
        vm.getTemplate = getTemplate;

        function init() {
            vm.widget = widgetService.findWidgetById(vm.widgetId);
            vm.widgets = widgetService.findWidgetsByPageId(vm.pageId);
            console.log(vm.widget)
        }
        init();

        function getTemplate(widgetType) {
            var template = 'views/widget/templates/widget-' + vm.widget.widgetType.toLowerCase() + '.html';
            return template;
        }

        function deleteWidget() {
            widgetService.deleteWidget(vm.widgetId);
            $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/' + vm.pageId + /widget/);
        }

        function updateWidget() {
            var result = widgetService.updateWidget(vm.widgetId, vm.widget);
            $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/' + vm.pageId + /widget/);
        }
    }
})();