
(function () {
    angular
        .module('WebAppMaker')
        .factory('userService', userService);

    function userService($http) {

        return {
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            updateUser: updateUser,
            deleteUser: deleteUser
        };

        function createUser(user) {
            var url = "/api/user";
            $http.post(url, user);
        }

        function findUserByUsername(username) {
            var url = "/api/user?username=" + username;
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateUser(userId, newUser) {
            var url = "/api/user/" + userId;
            $http.put(url, user);
        }

        function deleteUser(userId) {
            var url = "/api/user/" + userId;
            $http.put(url, user);
        }

        function findUserByCredentials(username, password) {
            var url = "/api/user?username=" + username + "&&password=" + password;
            return $http.get(url).then(
                function(response) {
                    return response.data;
                }
            );
        }

        function findUserById(userId) {
            var url = "/api/user/" + userId;
            return $http.get(url).then(function (response) {
                return response.data;
            });
        }
    }
})();