(function() {
    angular
        .module("ProjectMaker")
        .controller("favoriteListController", favoriteListController)
        .controller("favoriteDetailController", favoriteDetailController);

    function favoriteDetailController($routeParams, $location, favoriteService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.likeType = $routeParams.type;
        vm.likeId = $routeParams.likeId;
        vm.sharerId = $routeParams.sharerId;
        console.log(vm.sharerId);

        function init() {
            favoriteService.findLikeById(vm.likeId, vm.likeType)
                .then(function (response) {
                    vm.like = response.data;
                });
            favoriteService.findSharedUser(vm.sharerId)
                .then(function (response) {
                    vm.sharedUser = response.data;
                });
        }
        init();



    }


    function favoriteListController($routeParams, favoriteService) {
        var vm = this;
        vm.deleteLike = deleteLike;
        function init() {
            vm.userId = $routeParams.userId;
            favoriteService.findLikePhotoByUser(vm.userId)
                .then(function (response) {
                    vm.favoritePhotos = response.data;
                });
            favoriteService.findLikeAlbumByUser(vm.userId)
                .then(function (response) {
                    vm.likeAlbums = response.data;
                });

        }
        init();

        function deleteLike(likeId, likeType) {
            favoriteService.deleteLike(likeId, likeType, vm.userId)
                .then(function (response) {
                    init();
                },
                    function (error) {
                        vm.error = error.data;
                    });
        }
    }


})();