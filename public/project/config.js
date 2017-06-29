(function () {
    angular
        .module('ProjectMaker')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider

            .when('/', {templateUrl: 'home.html'})

            .when('/homepage', {
                templateUrl: 'views/homepage/home-page.html',
                controller: 'HomePageController',
                controllerAs: 'model'
            })

            .when('/photo2016',{
                templateUrl: 'views/homepage/photoOf2016.html'
            })

            .when('/login', {
                templateUrl: 'views/user/login.html',
                controller: 'LoginController',
                controllerAs: 'model'
            })

            .when('/register', {
                    templateUrl: 'views/user/register.html',
                    controller: 'RegisterController',
                    controllerAs: 'model'
                }
            )

            .when('/profile', {
                    templateUrl: 'views/user/profile.html',
                    controller: 'ProfileController',
                    controllerAs: 'model',
                    resolve: {
                        currentUser: checkLoggedIn
                    }
                }
            )



            .when("/user/:userId/shares", {
                templateUrl: "views/collection/collectionList.html",
                controller: "ListController",
                controllerAs: "model"
            })

            .when("/user/:userId/shares/new", {
                templateUrl: "views/collection/newCollection.html",
                controller: "newCollectionController",
                controllerAs: "model"
            })

            .when("/user/:userId/shares/photo/:shareId/edit", {
                templateUrl: "views/collection/editCollection.html",
                controller: "editCollectionController",
                controllerAs: "model"
            })

            .when("/user/:userId/shares/album/:shareId/edit", {
                templateUrl: "views/collection/editAlbum.html",
                controller: "editAlbumController",
                controllerAs: "model"
            })

            .when("/user/:userId/shares/album/:shareId/addmore", {
                templateUrl: "views/collection/addToAlbum.html",
                controller: "addToController",
                controllerAs: "model"
            })


            .when("/user/:userId/likes", {
                templateUrl: "views/function/favoriteList.html",
                controller: "favoriteListController",
                controllerAs: "model"
            })

            .when("/user/:userId/likes/:type/:likeId/:sharerId/information", {
                templateUrl: "views/function/favoriteDetail.html",
                controller: "favoriteDetailController",
                controllerAs: "model"
            })

            .when("/user/:userId/findAll", {
                templateUrl: "views/function/allCollections.html",
                controller: "findAllController",
                controllerAs: "model"
            })

            .when("/user/:userId/findAll/:type/:shareId/:sharerId/information", {
                templateUrl: "views/function/collectionDetails.html",
                controller: "shareInformationController",
                controllerAs: "model"
            })

            .when("/admin",{
                templateUrl: 'views/user/admin.html',
                controller: "adminController",
                controllerAs: "model"
            })
            .when("/admin/:userId/edit",{
                templateUrl: 'views/user/adminEdit.html',
                controller: "adminEditController",
                controllerAs: "model"
            })

            .when("/user/:userId/findAll/flickr",{
                templateUrl: 'views/function/flickr.html',
                controller:"flickrController",
                controllerAs: "model"
            })





    }

    function checkLoggedIn($q, $location, UserService) {
        var deferred = $q.defer();
        UserService
            .checkLoggedIn()
            .then(function (currentUser) {
                if (currentUser === '0') {
                    deferred.reject();
                    $location.url('/login');
                } else {
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }

})();