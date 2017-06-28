module.exports = function(app) {

    var mongoose = require('mongoose');
    mongoose.Promise = require('q').Promise;

    if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
        var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
        var password = process.env.MLAB_PASSWORD_WEBDEV;
        connectionString = 'mongodb://' + username + ':' + password;
        connectionString += '@ds133388.mlab.com:33388/heroku_pznwddsl'; // user yours
    }

    try {
        mongoose.connect('mongodb://127.0.0.1:27017/test'); //- starting a db connection
    }catch(err) {
        mongoose.createConnection('mongodb://127.0.0.1:27017/test'); //- starting another db connection
    }

    var model = require("./model/modelServer.js")();
    require("./services/userService.server.js")(app, model);
    require("./services/photoService")(app,model);
    require("./services/album.service.server")(app,model);

};
