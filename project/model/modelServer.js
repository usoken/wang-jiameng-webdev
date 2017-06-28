module.exports = function (app) {
    var uModel = require('./user/userModel')(app);
    var photoModel = require('./collection/photoModel')(app);
    var albumModel = require('./collection/albumModel')(app);

    var model = {
        uModel: uModel,
        photoModel:photoModel,
        albumModel:albumModel
    };
    return model;

};