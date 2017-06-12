

module.exports = function(app) {

    var models = require("./model/models.server")();
    require("./services/user.service.server")(app, models);
    require("./services/website.service.server")(app, models);
    require("./services/page.service.server")(app, models);
//    require("assignment/services/widget.service.server.js")(app, models);

    var mongoose = require('mongoose');
    mongoose.Promise = require('q').Promise;

    try {
        mongoose.connect('mongodb://127.0.0.1/test'); //- starting a db connection
    }catch(err) {
        mongoose.createConnection('mongodb://127.0.0.1/test'); //- starting another db connection
    }

};

