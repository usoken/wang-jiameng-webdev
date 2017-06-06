
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

        function updateUser(userId, User) {
            var url = "/api/user/" + userId;
            var newUser = {
                id: userId,
                User:User
            };
            return $http.put(url, newUser);
        }

        function deleteUser(userId) {
            var url = "/api/user/" + userId;
            $http.delete(url);
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