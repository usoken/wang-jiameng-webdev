(function() {
    angular
        .module("ProjectMaker")
        .factory("collectionService", collectionService);

    function collectionService($http) {
        var api = {
            createShare: createShare,
            updateShare: updateShare,
            findPhotoByUser: findPhotoByUser,
            findShareAlbumByUser: findShareAlbumByUser,
            findShareById: findShareById,
            findPhotoForAlbum: findPhotoForAlbum,
            addPhotoToAlbum: addPhotoToAlbum,
            deletePhotoFromAlbum: deletePhotoFromAlbum,
            deleteShare: deleteShare,
            createFlickr: createFlickr

        };
        return api;

        function  createFlickr(photoUrl, photoId) {
            var url = "/api/user/flickr/";
            return $http.post(url,photoUrl, photoId)
        }
        
        function findPhotoForAlbum(albumId) {
            return $http.get("/api/user/"+albumId+"/findPhotoForAlbum");
        }

        function createShare(userId, name, type, description) {
            if (type == "photo") {
                var url = "/api/user/"+ userId +"/photo";
            }
            else {
                var url = "/api/user/"+ userId +"/album";
            }
            var share = {
                name: name,
                type: type,
                description: description
            };
            return $http.post(url, share);
        }

        function updateShare(shareId, share) {
            if (share.type == "photo") {
                var url = "/api/photo/" + shareId;
            }
            else {
                var url = "/api/album/" + shareId;
            }
            return $http.put(url, share);
        }
        
        function addPhotoToAlbum(photoId, albumId) {
            var url = "/api/photo/" + photoId + "/" + albumId + "/addPhotoToAlbum";
            return $http.put(url);
        }
        
        function deletePhotoFromAlbum(photoId, albumId) {
            var url = "/api/photo/" + photoId + "/" + albumId + "/deletePhotoFromAlbum";
            return $http.put(url);
        }

        function deleteShare(shareId, shareType) {
            if (shareType == "photo") {
                var url = "/api/photo/" + shareId;
            }
            else {
                var url = "/api/album/" + shareId;
            }
            return $http.delete(url)
        }

        function findPhotoByUser(userId) {
            var url = "/api/user/"+ userId +"/photo";
            return $http.get(url);
        }

        function findShareAlbumByUser(userId) {
            var url = "/api/user/"+ userId +"/album";
            return $http.get(url);
        }

        

        function findShareById(shareId, shareType) {
            if (shareType == "photo") {
                var url = "/api/photo/" + shareId;
            }
            else {
                var url = "/api/album/" + shareId;
            }
            return $http.get(url);
        }
    }


})();