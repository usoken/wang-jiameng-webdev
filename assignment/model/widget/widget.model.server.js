module.exports = function () {
    var mongoose = require('mongoose');
    var widgetSchema = require("./widget.schema.server");
    var widgetModel = mongoose.model("widgetModel", widgetSchema);

    widgetModel.createWidget = createWidget;
    widgetModel.findWidgetsByPageId = findWidgetsByPageId;
    widgetModel.findWidgetById = findWidgetById;
    widgetModel.updateWidget = updateWidget;
    widgetModel.deleteWidget = deleteWidget;

    module.exports = widgetModel;

    return {
        createWidget: createWidget,
        findWidgetsByPageId: findWidgetsByPageId,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget
    };

    function createWidget(widget) {
        return widgetModel.create(widget);

    }

    function findWidgetsByPageId(pageId) {
        return widgetModel.find({_page: pageId});
    }

    function findWidgetById(widgetId) {
        return widgetModel.findOne({_id: widgetId});
    }

    function updateWidget(widgetId, widget) {
        return widgetModel.update(
            {_id: widgetId},
            {$set: widget});
    }

    function deleteWidget(widgetId) {

        return widgetModel.remove({_id: widgetId});
    }
};