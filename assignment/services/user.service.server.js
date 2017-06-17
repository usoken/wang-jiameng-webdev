module.exports = function (app, models) {
    var userModel = models.userModel;
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    var bcrypt = require("bcrypt-nodejs");
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    passport.use(new LocalStrategy(localStrategy));
    user.password = bcrypt.hashSync(user.password);
    return userModel.createUser(user);
    var facebookConfig = {
        clientID : process.env. FACEBOOK_CLIENT_ID ,
        clientSecret : process.env. FACEBOOK_CLIENT_SECRET ,
        callbackURL : process.env. FACEBOOK_CALLBACK_URL,
        profileFields: ['email']


    };
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));


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
    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/assignment/index.html#!/profile',
            failureRedirect: '/#!/login'
        }));

    function facebookStrategy(token, refreshToken, profile, done) {
       userModel.findUserByFacebookId(profile.id).then(
           function (user) {
               if(user) {
                   return done(null, user);
               }
               else {
                   var newFacebookUser = {
                       username:  profile.displayName,
                       facebook: {
                           id:    profile.id,
                           token: token
                       }
                   };
                   return userModel.createUser(newFacebookUser);
               }

           },

           function(err) {
                if (err) { return done(err); }
           })
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
        userModel
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

    function  login (req, res) {
        var user = req.user;
        res.json(user);
    }

    function  logout (req, res) { req.logOut();
        res.send(200);
    }

    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if (!user) {
                        return done(null, false);
                    }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }


    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
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


