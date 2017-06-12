(function () {
    angular
        .module('WebAppMaker')
        .service('FlickrService', FlickrService);

    function FlickrService($http) {
        this.searchPhotos = searchPhotos;
        var key = "064c4789290f3daa888f2b2eecf389fb";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        function searchPhotos(searchTerm) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }
})();