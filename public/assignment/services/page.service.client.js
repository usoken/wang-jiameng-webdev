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
            page._id = (new Date()).getTime() + "";
            page.websiteId = websiteId;
            return $http.post(url, page).then(function (response) {
                return response.data;
            });
        }

        function findPagesByWebsiteId(websiteId) {
            var url = "/api/website/" + websiteId + "/page";
            return $http.get(url).then(
                function(response) {
                    return response.data;
                }
            );
        }

        function findPageById(pageId) {
            console.log(pageId);
            var url = "/api/page/" + pageId;
            return $http.get(url);
        }

        function updatePage(pageId, page) {
            var url = "/api/page/" + pageId;
            return $http.put(url, page);
            //     .then(function (response) {
            //     return response.data;
            //
            // });
        }

        function deletePage(pageId) {
            var url = "/api/page/" + pageId;
            $http.delete(url);
        }
    }
})();