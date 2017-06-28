(function() {
    angular
        .module("ProjectMaker")
        .factory("favoriteService", favoriteService);

    function favoriteService($http) {
        var api = {
            findLikePhotoByUser: findLikePhotoByUser,
            findLikeAlbumByUser: findLikeAlbumByUser,
            findLikeById: findLikeById,
            findSharedUser: findSharedUser,
            findPhotoForAlbum: findPhotoForAlbum,
            createLike: createLike,
            updateLike: updateLike,
            deleteLike: deleteLike

        };
        return api;

        function findPhotoForAlbum(albumId) {
            return $http.get("/api/user/"+albumId+"/findPhotoForAlbum");
        }

        function createLike(userId, name, type, description) {
            if (type == "photo") {
                var url = "/api/user/"+ userId +"/photo";
            }
            else {
                var url = "/api/user/"+ userId +"/album";
            }
            var Like = {
                name: name,
                type: type,
                description: description
            };
            return $http.post(url, Like);
        }

        function updateLike(LikeId, Like) {
            if (Like.type == "photo") {
                var url = "/api/photo/" + LikeId;
            }
            else {
                var url = "/api/album/" + LikeId;
            }
            return $http.put(url, Like);
        }

        function deleteLike(LikeId, shareType, userId) {
            if (shareType == "photo") {
                var url = "/api/photo/" + LikeId + "/" + userId;
            }
            else {
                var url = "/api/album/" + LikeId + "/" + userId;
            }
            return $http.delete(url)
        }

        function findLikePhotoByUser(userId) {
            var url = "/api/user/"+ userId +"/photoLike";
            return $http.get(url);
        }

        function findLikeAlbumByUser(userId) {
            var url = "/api/user/"+ userId +"/albumLike";
            return $http.get(url);
        }
        
        function findLikeById(LikeId, LikeType) {
            if (LikeType == "photo") {
                var url = "/api/photo/" + LikeId;
            }
            else {
                var url = "/api/album/" + LikeId;
            }
            return $http.get(url);
        }

        function findSharedUser(userId) {
            var url ="/api/user/" + userId;
            return $http.get(url);
        }
    }


})();