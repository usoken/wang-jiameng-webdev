module.exports = function () {
    var mongoose = require('mongoose');
    var pageSchema = require('./page.schema.server');
    var pageModel = mongoose.model('pageModel', pageSchema);
    var websiteModel = require('../website/website.model.server');

    pageModel.createPage = createPage;
    pageModel.findPagesByWebsiteId = findPagesByWebsiteId;
    pageModel.updatePage = updatePage;
    pageModel.findPageById = findPageById;
    pageModel.deletePage = deletePage;

    module.exports = pageModel;

    return {
        createPage: createPage,
        findPagesByWebsiteId: findPagesByWebsiteId,
        updatePage: updatePage,
        findPageById: findPageById,
        deletePage: deletePage
    };

    function createPage(page) {
        return pageModel
            .create(page)
            .then(function (page) {
                var websiteId = page._website;
                var pageId = page._id;
                websiteModel.addPageToArray(websiteId, pageId);
            })
    }

    function findPagesByWebsiteId(websiteId) {
        return pageModel.find({_website: websiteId});

    }

    function findPageById(pageId) {
        return pageModel.findOne({_id: pageId});

    }

    function updatePage(pageId, page) {
        return pageModel.update(
            {_id: pageId},
            {$set: page});
    }

    function deletePage(pageId) {
        return pageModel
            .findPageById(pageId)
            .then(function (page) {
                var websiteId = page._website;
                pageModel
                    .remove({_id: pageId})
                    .then(function () {
                        return websiteModel.deletePageFromArray(websiteId, pageId)
                    })
            })
    }
};