(function() {
    angular
        .module('ProjectMaker')
        .controller("ListController", ListController)
        .controller("newCollectionController", newCollectionController)
        .controller("editCollectionController", editCollectionController)
        .controller("editAlbumController",editAlbumController)
        .controller("addToController", addToController);
    
    function addToController($routeParams, $location, collectionService) {
        var vm = this;
        vm.addToAlbum = addToAlbum;
        vm.userId = $routeParams.userId;
        vm.shareId = $routeParams.shareId;
        function init() {
            collectionService.findPhotoByUser(vm.userId)
                .then(function (response) {
                    vm.photos = response.data;
                });
        }
        init();

        function addToAlbum(shareId, shareName) {
            collectionService.addPhotoToAlbum(shareId, vm.shareId)
                .then(function (response) {
                    vm.success = shareName + "is added to your album";
                }, function (error) {
                    vm.error = error.data;
                })
        }
    }
    
    function editAlbumController($routeParams, $location, collectionService) {
        var vm = this;
        vm.deletePhotoFromAlbum = deletePhotoFromAlbum;
        vm.deleteShare = deleteShare;
        vm.userId = $routeParams.userId;
        vm.shareId = $routeParams.shareId;
        function init() {
            collectionService.findPhotoForAlbum(vm.shareId)
                .then(function (response) {
                    vm.photos = response.data;
                });
            collectionService.findShareById(vm.shareId, "album")
                .then(function (response) {
                    vm.album = response.data;
                });
        }
        init();

        function deleteShare() {
            collectionService.deleteShare(vm.shareId, "album")
                .then(function (response) {
                        $location.url("/user/" + vm.userId + "/shares");
                    },
                    function (error) {
                        vm.error = error.data;
                    });
        }

        function deletePhotoFromAlbum(shareId, shareName) {
            collectionService.deletePhotoFromAlbum(shareId, vm.shareId)
                .then(function (response) {
                    vm.success = shareName + " is deleted from your album";
                    init();
                }, function (error) {
                    vm.error = error.data;
                })
        }
    }

    function newCollectionController($routeParams, $location, collectionService) {
        var vm = this;
        vm.createShare = createShare;
        vm.userId = $routeParams.userId;

        function createShare(name, type, description) {
            if (name === undefined) {
                vm.error = "Name Required";
            }
            else if (type == undefined)    {
                vm.error = "Type Required";
            } 
            else {
                collectionService.createShare(vm.userId, name, type, description)
                    .then(function (response) {
                            $location.url("/user/" + vm.userId + "/shares");
                        },
                        function (error) {
                            vm.error = error.data;
                        });
            }

        }


    }

    function editCollectionController($routeParams, $location, collectionService) {
        var vm = this;
        vm.updateShare = updateShare;
        vm.deleteShare = deleteShare;
        vm.userId = $routeParams.userId;
        vm.shareId = $routeParams.shareId;

        function init() {
            collectionService.findShareById(vm.shareId, "photo")
                .then(function (response) {
                    vm.share = response.data;
                });
        }
        init();

        function deleteShare() {
            collectionService.deleteShare(vm.shareId, "photo");
            $location.url("/user/" + vm.userId + "/shares");
        }

        function updateShare() {
            if (vm.share.name === undefined) {
                vm.error = "Name required";
            }
            else {
                collectionService.updateShare(vm.shareId, vm.share);
                $location.url("/user/" + vm.userId + "/shares");
            }
        }
    }


    function ListController($routeParams, collectionService) {
        var vm = this;
        function init() {
            vm.userId = $routeParams.userId;
            collectionService.findPhotoByUser(vm.userId)
                .then(function (response) {
                    vm.sharePhotos = response.data;
                });
            collectionService.findShareAlbumByUser(vm.userId)
                .then(function (response) {
                    vm.shareAlbums = response.data;
                });
            
        }
        init();
    }


})();