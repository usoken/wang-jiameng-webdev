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

            collectionService.createShare(vm.userId,photo.id, "music", description).then(
                function (res) {
                    collectionService.createFlickr(url,res.data._id);
                }
            );


            AllService.findShareMusic()
                        .then(function (response) {
                            vm.shareMusics = response.data;
                        });
            $location.url("/user/" + vm.userId + "/findAll");


            // collectionService.update
            // widget = {
            //     '_id': vm.widgetId,
            //     'name': '',
            //     'widgetType': 'IMAGE',
            //     'pageId': vm.pageId,
            //     'width': '',
            //     'url': url,
            //     'text': ''
            // };
            //
            // widgetService
            //     .updateWidget(vm.widgetId, widget)
            //     .then(function () {
            //         $location.url('/user/' + vm.userId + '/website/' + vm.websiteId + '/page/' + vm.pageId + '/widget/' + vm.widgetId);
            //     });


        }

    }
})();
