(function () {
    angular
        .module("WebAppMaker")
        .factory("widgetService", widgetService);

    widgets = [
        { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    function widgetService() {
        return {
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById:findWidgetById,
            createWidget:createWidget,
            updateWidget:updateWidget,
            deleteWidget:deleteWidget,
            findAllWidgetsForUser:findAllWidgetsForUser
        };

        function findWidgetById(widgetId) {
            for (var w in widgets) {
                if(widgets[w]._id == widgetId) {
                    return widgets[w];
                }
            }
            return null;
        }

        function findWidgetsByPageId(pageId) {
            var result = [];
            for (var w in widgets) {
                if(widgets[w].pageId == pageId) {
                    result.push(widgets[w]);
                }
            }
            return result;
        }

        function createWidget(pageId, widget) {
            widget.pageId = pageId;
            widgets.push(widget);
        }

        function updateWidget(widgetId, widget) {
            for (var w in widgets) {
                if(widgets[w]._id == widgetId) {
                    widgets[w] = widget;
                    return true;
                }
            }
            return false;
        }

        function deleteWidget(widgetId) {
            for (var w in widgets) {
                if(widgets[w]._id == widgetId) {
                    widgets.splice(w,1);
                    return true;
                }
            }
            return false;
        }

        function findAllWidgetsForUser(pageId) {
            var resultSet = [];
            for (var w in pages) {
                if (pages[w].pageId === pageId) {
                    resultSet.push(widgets[w]);
                }
            }
            return resultSet;
        }
    }
})();