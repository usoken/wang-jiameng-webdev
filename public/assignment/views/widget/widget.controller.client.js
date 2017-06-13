(function () {
    angular
        .module('WebAppMaker')
        .controller('WidgetListController', WidgetListController)
        .controller('NewWidgetController', NewWidgetController)
        .controller('EditWidgetController', EditWidgetController)
        .controller('FlickrImageSearchController', FlickrImageSearchController);


    function WidgetListController($sce, $routeParams,widgetService) {
        var vm = this;
        vm.getHtml = getHtml;
        vm.getUrl = getUrl;
        vm.getTemplate = getTemplate;

        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];

        function init() {
            widgetService
                .findWidgetsByPageId(vm.pageId)
                .then(function (data) {
                    vm.widgets = data;
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
            if (widgetType === "HTML") {
                var template = 'views/widget/widget-html.view.client.html';
            }
            if (widgetType === "TEXT") {
                var template = 'views/widget/widget-text.view.client.html';
            }
            return template;
        }

    }

    function NewWidgetController($location, $routeParams, widgetService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.createWidget = createWidget;

        function init() {
            console.log("new");
            widgetService
                .findWidgetsByPageId(vm.pageId)
                .then(function (data) {
                    vm.widgets = data;
                });
        }

        init();

        function createWidget(widgetType) {
            var newWidget = {
                _page: vm.pageId,
                widgetType: widgetType
            };

            widgetService
                .createWidget(vm.pageId, newWidget)
                .then(function (res) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + res.data._id);
                    return res.data;
                });
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
            console.log("edit");
            widgetService
                .findWidgetsByPageId(vm.pageId)
                .then(function (widgets) {
                    vm.widgets = widgets;
                });

            widgetService
                .findWidgetById(vm.widgetId)
                .then(function (widget) {
                    vm.widget = widget;
                });
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
            if (widgetType === "HTML") {
                var template = 'views/widget/widget-html.view.client.html';
            }
            if (widgetType === "TEXT") {
                var template = 'views/widget/widget-text.view.client.html';
            }
            return template;
        }

        function deleteWidget() {
            widgetService
                .deleteWidget(vm.widgetId)
                .then(function () {
                    $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/' + vm.pageId + '/widget/');
                });
        }

        function updateWidget() {
            console.log(vm.widget);
            widgetService.updateWidget(vm.widgetId, vm.widget);
            $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/' + vm.pageId + '/widget/');
        }
    }

    function FlickrImageSearchController($sce, $routeParams, widgetService, flickrService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.widgetId = $routeParams['wgid'];

        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;

        function init() {
            widgetService
                .findWidgetsByPageId(vm.pageId)
                .then(function (widgets) {
                    vm.widgets = widgets;
                });
        }
        init();



        function searchPhotos(searchTerm) {
            flickrService
                .searchPhotos(searchTerm)
                .then(function (response) {
                    data = response.data.replace("jsonFlickrApi(", "");
                    data = data.substring(0, data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        }


        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            widget = {
                '_id': vm.widgetId,
                'name': '',
                'widgetType': 'IMAGE',
                'pageId': vm.pageId,
                'width': '',
                'url': url,
                'text': ''
            };

            widgetService
                .updateWidget(vm.widgetId, widget)
                .then(function () {
                    $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/' + vm.pageId + '/widget/' + vm.widgetId);
                });
        }

    }




})();