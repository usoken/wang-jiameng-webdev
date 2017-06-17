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
            deleteUser: deleteUser,
            checkLoggedIn: checkLoggedIn,
            login:login,
            logout:logout,
            register: register


        };

        function checkLoggedIn() {
            var url = "/api/checkLoggedIn";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createUser(user) {
            var url = "/api/user";
            return $http.post(url, user);
        }

        function login(username, password) {
            var user = {
                username:username,
                password:password
            };
            return $http.post ("/api/login ", user).then(
                function (res) {
                    return res.data;
                }
            );
        }
        
        function logout() {
            return $http.post("/api/logout");
        }
        
        function register(user) {
            return $http.post("/api/register", user).then(
                function (res) {
                    return res.data;
                }
            )
        }

        function findUserByCredentials(username, password) {
            var url = "/api/assignment/user?username=" + username + "&password=" + password;
            return $http
                .get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserById(userId) {
            var url = "/api/user/" + userId;
            return $http.get(url);
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
            var data = {
                id: userId,
                newUser: newUser
            };
            return $http.put(url, data);
        }

        function deleteUser(userId) {
            var url = "/api/user/" + userId;
            return $http
                .delete(url);
        }
    }
})();
