(function () {
    angular
        .module("WebAppMaker")
        .factory("widgetService", widgetService);
    function widgetService($http) {
        return {
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById:findWidgetById,
            createWidget:createWidget,
            updateWidget:updateWidget,
            deleteWidget:deleteWidget

        };

        function findWidgetById(widgetId) {
            var url = "/api/widget/" + widgetId;
            return $http.get(url).then(function (res) {
                return res.data;
            })
        }

        function findWidgetsByPageId(pageId) {
            var url = "/api/page/" + pageId + "/widget";
            return $http.get(url).then(function (res) {
                return res.data;
            });

        }

        function createWidget(pageId, widget) {
            var url = "/api/page/" + pageId + "/widget";
            var data = {
                pageId : pageId,
                widget : widget
            };
            return $http.post(url, data).then(function (res) {
                return res.data;
            });
        }

        function updateWidget(widgetId, widget) {
            var url = "/api/widget/" + widgetId;
            var data = {
                widgetId: widgetId,
                widget: widget
            };
            return $http.put(url, data).then(function (res) {
                return res.data;
            });
        }

        function deleteWidget(widgetId) {
            var url = "/api/widget/" + widgetId;
            return $http.delete(url).then(function (res) {
                return res.data;
            });

        }

    }
})();