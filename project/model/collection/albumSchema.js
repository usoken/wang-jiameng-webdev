module.exports = function () {
    var mongoose = require("mongoose");

    var albumSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.Types.ObjectId, ref: 'uModel'},
        name: String,
        type: String,
        description: String,
        followers:[{type: mongoose.Schema.Types.ObjectId, ref: 'uModel'}],
        contains:[{type: mongoose.Schema.Types.ObjectId, ref: 'photoModel'}],
        dataCreate: {type: Date, default: Date.now}

    }, {collection: "project.album"});

    return albumSchema;
};