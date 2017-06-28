
(function() {
    angular
        .module("ProjectMaker")
        .controller("findAllController", findAllController)
        .controller("shareInformationController", shareInformationController);
    
    function shareInformationController($routeParams, $location, AllService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.shareType = $routeParams.type;
        vm.shareId = $routeParams.shareId;
        vm.sharerId =  $routeParams.sharerId;
        function init() {
            AllService.findLikeById(vm.shareId, vm.shareType)
                .then(function (response) {
                    vm.like = response.data;
                });
            AllService.findSharedUser(vm.sharerId)
                .then(function (response) {
                    vm.sharedUser = response.data;
                });
            if (vm.shareType =="album") {
                AllService.findPhotoForAlbum(vm.shareId)
                    .then(function (response) {
                        vm.photos = response.data;
                    });
            }
        }
        init();
    }

    function findAllController($routeParams, $location, AllService) {
        var vm = this;
        vm.addLike = addLike;
        vm.getInformation = getInformation;
        function init() {
            vm.userId = $routeParams.userId;
            AllService.findSharePhoto()
                .then(function (response) {
                    vm.sharePhotos = response.data;
                });
            AllService.findShareAlbum()
                .then(function (response) {
                    vm.shareAlbums = response.data;
                });

        }
        init();

        function getInformation(Type, shareId, sharerId) {

                if (Type =="photo") {
                    $location.url("/user/" + vm.userId + "/findAll/photo/" + shareId + "/" + sharerId + "/information");
                }
                else {
                    $location.url("/user/" + vm.userId + "/findAll/album/" + shareId + "/" + sharerId + "/information");
                }
            }

        function addLike(shareId, shareType, shareName) {
                AllService.addLike(shareId, shareType, vm.userId)
                    .then(
                        function (response) {
                            vm.success = "Successfully add " + shareName + " to your Likes";
                        }, 
                        function (error) {
                            vm.error = error.data;

                        }
                    )}
    }




})();