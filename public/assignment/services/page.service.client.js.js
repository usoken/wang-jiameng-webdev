(function () {
    angular
        .module("WebAppMaker")
        .factory("pageService", pageService);

    var pages = [
        {"_id": "321", "name": "Post 1", "websiteId": "456", "title": "Lorem"},
        {"_id": "432", "name": "Post 2", "websiteId": "456", "title": "Lorem"},
        {"_id": "543", "name": "Post 3", "websiteId": "456", "title": "Lorem"}
    ];

    function pageService() {
        return {
            findPagesByWebsiteId: findPagesByWebsiteId,
            findPageById: findPageById,
            createPage: createPage,
            updatePage: updatePage,
            deletePage: deletePage,
            findAllPagesForUser: findAllPagesForUser
        };

        function createPage(websiteId, page) {
            page.websiteId = websiteId;
            pages.push(page);
        }

        function findPagesByWebsiteId(websiteId) {
            var result = [];
            for (var p in pages) {
                if (pages[p].websiteId === websiteId) {
                    result.push(pages[p]);
                }
            }
            return result;
        }

        function findPageById(pageId) {
            for (var p in pages) {
                if (pages[p]._id === pageId) {
                    return pages[p];
                }
            }
            return null;
        }

        function updatePage(pageId, page) {
            for (var p in pages) {
                if (pages[p]._id === pageId) {
                    pages[p] = page;
                    return true;
                }
            }
            return false;
        }

        function deletePage(pageId) {
            for (var p in pages) {
                if (pages[p]._id === pageId) {
                    pages.splice(p, 1);
                    return true;
                }
            }
            return false;
        }

        function findAllPagesForUser(websiteId) {
            var resultSet = [];
            for (var w in pages) {
                if (pages[w].websiteId === websiteId) {
                    console.log(websiteId);
                    resultSet.push(pages[w]);
                }
            }
            console.log("service" + resultSet);
            return resultSet;
        }
    }
})();