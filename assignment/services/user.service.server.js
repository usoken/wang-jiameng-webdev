module.exports = function (app) {
    app.post("/api/user", createUser);
    app.get("/api/user", findUserByUsername);
    app.get("/api/user", findUserByCredentials);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    ];


    function createUser(req, res) {
        var user = req.body;
        users.push(user);
        res.json(users);
    }


    function findUserByUsername(req, res) {
        var username = req.query["username"];
        for (var u in users) {
            if (users[u].username === username) {
                res.json(users[u]);
                return;
            }
        }
        res.send("0");
    }

    function findUserByCredentials (req, res) {
        var username = req.query["username"];
        var password = req.query["password"];
        for(var u in users) {
            var user = users[u];
            if( user.username === username &&
                user.password === password) {
                res.json(user);
                return;
            }
        }
        res.send("0");
    }

    function findUserById(req,res) {
        var userId = req.params["userId"];
        for (var u in users) {
            var user = users[u];
            if (user._id === userId) {
                res.json(user);
                return;
            }
        }
        res.send("0");
     }

    function updateUser(req, res) {
        var userId = req.params["userId"];
        console.log(userId);
        var user = users.find(function (user) {
            return user._id === userId;
        });
        var index = users.indexOf(user);
        users.splice(index, 1);
        var newUser = req.body;
        newUser._id = userId;
        users.splice(index,0, newUser);
        res.json(users);
    }

    function deleteUser(req, res) {
        var userId = req.params["userId"];
        console.log(userId);
        var user = users.find(function (user) {
            return user._id === userId;
        });
        var index = users.indexOf(user);
        users.splice(index, 1);
        res.json(users);
    }




};


