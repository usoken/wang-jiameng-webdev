(function () {
    angular
        .module('WebAppMaker')
        .factory('pageService', pageService);

    function pageService($http) {


        return {
            findPageById: findPageById,
            createPage: createPage,
            updatePage: updatePage,
            deletePage: deletePage,
            findPagesByWebsiteId: findPagesByWebsiteId
        };

        function createPage(websiteId, page) {
            var url = "/api/website/" + websiteId + "/page";
            var data = {
                websiteId: websiteId,
                page: page
            };
            return $http.post(url, data);
        }


        function findPageById(pageId) {
            var url = "/api/page/" + pageId;
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updatePage(pageId, page) {
            var url = "/api/page/" + pageId;
            var data = {
                pageId: pageId,
                page: page
            };
            return $http
                .put(url, data)
                .then(function (response) {
                    return response.data;
                });
        }

        function deletePage(pageId) {
            var url = "/api/page/" + pageId;
            return $http.delete(url);
        }

        function findPagesByWebsiteId(websiteId) {
            var url = "/api/website/" + websiteId + "/page";
            return $http.get(url).then(function (response) {
                return response.data;
            });
        }
    }
})();
