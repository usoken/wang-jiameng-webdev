(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
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
            widgetService.findWidgetsByPageId(vm.pageId).then(function (widgets) {
               vm.widgets = widgets;
            });
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

    function NewWidgetController($location, $routeParams, widgetService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.widgetId = $routeParams['wgid'];
        vm.createWidget = createWidget;

        function init() {
            widgetService.findWidgetsByPageId(vm.pageId).then(function (widgets) {
                vm.widgets = widgets;
            })
        }
        init();

        function createWidget(widgetType) {
            var newWidget = {
                _id: (new Date()).getTime()+"",
                name: "",
                widgetType: widgetType,
                pageId: vm.pageId
            };
            widgetService.createWidget(vm.pageId, newWidget);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + newWidget._id);
            return newWidget;
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
            widgetService.findWidgetById(vm.widgetId).then(function (widgets) {
                vm.widgets = widgets;
            });
            widgetService.findWidgetsByPageId(vm.pageId).then(function (widgets) {
                vm.widgets = widgets;
            });
            console.log(vm.widget)
        }
        init();

        function getTemplate(widgetType) {
            if (widgetType === "HEADING") {
                var template = 'views/widget/widget-heading.view.client.html';
            }
            if (widgetType === "IMAGE") {
                var template = 'views/widget/widget-image.view.client.html';
            }
            if (widgetType === "YOUTUBE") {
                var template = 'views/widget/widget-youtube.view.client.html';
            }

            return template;
        }

        function deleteWidget() {
            widgetService.deleteWidget(vm.widgetId).then(function () {
                $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/' + vm.pageId + /widget/);
            });
        }

        function updateWidget() {
            widgetService.updateWidget(vm.widgetId, vm.widget).then(function () {
                $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/' + vm.pageId + /widget/);
            });

        }
    }
})();