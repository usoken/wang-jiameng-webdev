(function() {
    angular
        .module("ProjectMaker")
        .factory("AllService", AllService);

    function AllService($http) {
        var api = {
            findSharePhoto: findSharePhoto,
            findShareAlbum: findShareAlbum,
            findLikeById: findLikeById,
            findSharedUser: findSharedUser,
            findPhotoForAlbum: findPhotoForAlbum,
            addLike: addLike

        };
        return api;

        function findPhotoForAlbum(albumId) {
            return $http.get("/api/user/"+albumId+"/findPhotoForAlbum");
        }

        function findSharedUser(userId) {
            var url ="/api/user/" + userId;
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
        
        function findSharePhoto() {
            var url = "/api/allPhotos";
            return $http.get(url);
        }
        
        function findShareAlbum() {
            var url = "/api/allAlbum";
            return $http.get(url);
        }

        function addLike(shareId, shareType, userId) {
            if (shareType == "photo") {
                var url = "/api/photo/" + shareId + "/" + userId;
            }
            else {
                var url = "/api/album/" + shareId + "/" + userId;
            }
            return $http.put(url);
        }
    
    }
})();