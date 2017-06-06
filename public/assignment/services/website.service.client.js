(function () {
    angular
        .module('WebAppMaker')
        .factory('websiteService', websiteService);

    function websiteService($http) {

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
            return $http.post(url, website).then(function (response) {
                return response.data;
            });
        }

        function updateWebsite(websiteId, Website) {
            var url = "/api/website/" + websiteId;
            return $http.put(url, Website).then(function (response) {
                return response.data;
            });
        }

        function deleteWebsite(websiteId) {
            var url = "/api/website/" + websiteId;
            $http.delete(url);
        }

        function findWebsiteById(websiteId) {
            var url = "/api/website/" + websiteId;
            return $http.get(url)
            //     .then(
            //     function(response) {
            //         return response.data;
            //     }
            // )
                ;
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