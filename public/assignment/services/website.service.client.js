(function () {
    angular
        .module('WebAppMaker')
        .factory('websiteService', websiteService);

    function websiteService() {

        return {
            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };

        function createWebsite(userId,website) {
            var url = "/api/user/" + userId + "/website";
            website._id = (new Date()).getTime() + "";
            website.developerId = userId;
            $http.post(url, website);
        }

        function updateWebsite(websiteId, Website) {
            var url = "/api/website/" + websiteId;
            $http.put(url, website);
        }

        function deleteWebsite(websiteId) {
            var url = "/api/website/" + websiteId;
            $http.delete(url);
        }

        function findWebsiteById(websiteId) {
            var url = "/api/website/" + websiteId;
            return $http.get(url).then(
                function(response) {
                    return response.data;
                }
            );
        }

        function findWebsitesByUser(userId) {
            var url = "/api/user/" + userId + "/website";
            return $http.get(url).then(
                function(response) {
                    return response.data;
                }
            );
        }
    }
})();