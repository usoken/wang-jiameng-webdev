module.exports = function (app, model) {


    var uModel = model.uModel;
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    var bcrypt = require("bcrypt-nodejs");
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    passport.use(new LocalStrategy(localStrategy));
    var googleConfig = {
        clientID     : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL  : process.env.GOOGLE_CALLBACK_URL
    };



    // app.get('/user/loggedin', loggedIn);
    app.get("/api/allUsers",findAllUsers);
    app.post("/api/user", createUser);
    app.get("/api/user", findUserByUsername);
    app.get("/api/assignment/user", findUserByCredentials);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    app.post ('/api/login', passport.authenticate('local'),  login );
    app.post('/api/logout',  logout );
    app.get('/api/checkLoggedIn', checkLoggedIn);
    app.post ("/api/register", register);
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get('/oauth2callback',
        passport.authenticate('google', {
            successRedirect: '/#/profile',
            failureRedirect: '/#/login'
        }));

    function findAllUsers(req,res) {
        uModel.findAllUsers().then(function (users) {
            res.json(users)
        },
        function (err) {
            res.status(404).send(err);
        })
    }

    passport.use(new GoogleStrategy(googleConfig, googleStrategy));

    function googleStrategy(token, refreshToken, profile, done) {
        uModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return userModel.createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    function register(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        uModel
            .createUser(user)
            .then(
                function (user) {
                    req.login(user, function (status) {
                        res.json(user);
                    });
                });
    }

    function checkLoggedIn(req, res) {
        if (req.isAuthenticated()) {
            res.json(req.user);
        } else {
            res.send('0');
        }
    }

    function loggedIn(req, res) {
        res.send(req.isAuthenticated() ? req.user : null);
    }

    function  login (req, res) {
        var user = req.user;
        res.json(user);
    }

    function  logout (req, res) { req.logOut();
        res.send(200);
    }

    function localStrategy(username, password, done) {
        uModel.findUserByUsername(username).then(
            function (user) {
                if(user && bcrypt.compareSync(password,user.password)) {
                    done(null, user);
                }
                else {
                    done(null, false);
                }
            }
            ,
            function (error) {
                done(error, false);
            }
        )
    }


    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        uModel
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, user);
                }
            )
    }

    function findUserByCredentials(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];

        uModel
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

        uModel
            .findUserByUsername(username)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.send(null);
            });
    }

    function findUserById(req, res) {
        var userId = req.params.userId;

        uModel
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
        uModel
            .createUser(user)
            .then(function (user) {
                res.json(user);
            });
    }

    function updateUser(req, res) {
        var id = req.body.id;
        var newUser = req.body.newUser;
        uModel
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
        uModel
            .deleteUser(id)
            .then(function (status) {
                    res.sendStatus(200);
                },
                function (err) {
                    res.status(404).send("Unable to remove user");

                });
    }
};

