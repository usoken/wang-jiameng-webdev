(function () {
    angular
        .module('WebAppMaker')
        .factory('pageService', pageService);


    function pageService() {

        var pages = [

                { "_id": "321", "name": "Post 1", "websiteId": "456", "title": "Lorem" },
                { "_id": "432", "name": "Post 2", "websiteId": "456", "title": "Lorem" },
                { "_id": "543", "name": "Post 3", "websiteId": "456", "title": "Lorem" }

        ];

        return {
            findPageById: findPageById,
            createPage: createPage,
            updatePage: updatePage,
            deletePage: deletePage,
            findPagesByWebsiteId: findPagesByWebsiteId
        };

        function createPage(websiteId, page) {
            page._id = (new Date()).getTime()+"";
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
            var p = pages.find(function (p) {
                return p._id === pageId;
            });
            p.name = page.name;
            p.description = p.description;
        }

        function deletePage(pageId) {
            var page = pages.find(function (page) {
                return page._id === pageId;
            });
            var index = pages.indexOf(page);
            pages.splice(index,1);
        }
    }
})();