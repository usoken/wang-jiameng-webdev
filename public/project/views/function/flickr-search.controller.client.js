(function () {
    angular.module('ProjectMaker').controller('flickrController', flickrController);

    function flickrController($location, $routeParams, flickrService, collectionService, AllService) {
        var vm = this;
        vm.userId = $routeParams.userId;

        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;

        function searchPhotos(searchTerm) {
            flickrService
                .searchPhotos(searchTerm)
                .then(function (response) {
                    data = response.data.replace("jsonFlickrApi(", "");
                    data = data.substring(0, data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                });
        }


        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";
            var name = "";
            var description = "";

            collectionService.createShare(vm.userId,photo.id, "photo", description).then(
                function (res) {
                    collectionService.createFlickr(url,res.data._id);
                }
            );


            AllService.findSharePhoto()
                        .then(function (response) {
                            vm.sharePhotos = response.data;
                        });
            $location.url("/user/" + vm.userId + "/findAll");


        }

    }
})();
