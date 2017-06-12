module.exports = function (app, models) {
    var userModel = models.userModel;

    app.post("/api/user", createUser);
    app.get("/api/user", findUserByUsername);
    app.get("/api/assignment/user", findUserByCredentials);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    return {
        createUser: createUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser:deleteUser
    };

    function createUser(req, res) {
        var user = req.body;
        userModel.createUser(user).then(function (user) {
            res.json(user);
        })
    }


    function findUserByUsername(req, res) {
        var username = req.query["username"];
        userModel.findUserByUsername(username).then(function (user) {
            res.json(user);
        });
    }

    function findUserByCredentials (req, res) {
        var username = req.query["username"];
        var password = req.query["password"];

        userModel.findUserByCredentials(username, password).then(function (user) {
            res.json(user);
        });
    }


    function findUserById(req,res) {
        var userId = req.query["userId"];
        userModel.findUserById(userId).then(function (user) {
            res.json(user);
        });
    }

    function updateUser(req, res) {
        var user = req.body;
        var userId = req.params["userId"];

        userModel.updateUser(userId,user).then(
            function (status) {
                res.sendStatus(status);
            }
        );
    }


    function deleteUser(req, res) {
        var userId = req.params["userId"];
        userModel.deleteUser(userId).then(function (status) {
            res.send(status);
        });
    }

};


