(function () {
    angular
        .module('ProjectMaker')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider

            .when('/',{templateUrl:'home.html'})

            .when('/homepage',{
                templateUrl:'views/homepage/home-page.html',
                controller:'HomePageController',
                controllerAs: 'model'})

            .when('/login',{
                templateUrl: 'views/user/login.html'
            })
            .when('/register',{
                templateUrl: 'views/user/register.html'
            })
            .when('/user/:uid',{
                templateUrl: 'views/user/profile.html'
            })

    }
})();