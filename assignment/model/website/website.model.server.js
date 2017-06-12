module.exports = function () {
    var mongoose = require('mongoose');
    var websiteSchema = require('./website.schema.server');
    var websiteModel = mongoose.model('websiteModel', websiteSchema);
    websiteModel.createWebsite = createWebsite;
    websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
    websiteModel.findWebsiteById = findWebsiteById;
    websiteModel.updateWebsite = updateWebsite;
    websiteModel.deleteWebsite = deleteWebsite;

    module.exports = websiteModel;

    return {
        createWebsite: createWebsite,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        deleteWebsite: deleteWebsite,
        updateWebsite: updateWebsite
    };

    function createWebsite(website) {
        return websiteModel.create(website);
    }

    function findAllWebsitesForUser(userId) {
        return websiteModel.find({_user: userId});
    }

    function findWebsiteById(websiteId) {
        return websiteModel.findById(websiteId);
    }

    function deleteWebsite(websiteId) {
        return websiteModel.remove({_id: websiteId});
    }

    function updateWebsite(websiteId, website) {
        return websiteModel.update(
            {
                _id:websiteId

            },
            {
                $set:website
            }
        );
    }
};
