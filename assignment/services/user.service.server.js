module.exports = function (app, models) {
    var userModel = models.userModel;

    app.post("/api/user", createUser);
    app.get("/api/user", findUserByUsername);
    app.get("/api/assignment/user", findUserByCredentials);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    function findUserByCredentials(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];

        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                if (user !== null) {
                    res.json(user);
                } else {
                    res.send(null);
                }
            }, function (err) {
                res.send(null);
            });
    }

    function findUserByUsername(req, res) {
        var username = req.query['username'];

        userModel
            .findUserByUsername(username)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.send(null);
            });
    }

    function findUserById(req, res) {
        var userId = req.params.userId;

        userModel
            .findUserById(userId)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.send(null);
                }
            );
    }

    function createUser(req, res) {
        var user = req.body;
        userModel
            .createUser(user)
            .then(function (user) {
                res.json(user);
            });
    }

    function updateUser(req, res) {
        var id = req.body.id;
        var newUser = req.body.newUser;
        userModel
            .updateUser(id, newUser)
            .then(function (user) {
                    res.sendStatus(200);
                },
                function (err) {
                    res.status(404).send("Unable to update User")
                });
    }

    function deleteUser(req, res) {
        var id = req.params.userId;
        userModel
            .deleteUser(id)
            .then(function (status) {
                    res.sendStatus(200);
                },
                function (err) {
                    res.status(404).send("Unable to remove user");

                });
    }
};


