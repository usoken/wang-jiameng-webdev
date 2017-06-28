module.exports = function () {
    var mongoose = require("mongoose");

    var photoSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        type: String,
        name: String,
        description: String,
        url: String,
        followers:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        belongsTo: [{type: mongoose.Schema.Types.ObjectId, ref: 'Album'}],
        dataCreate: {type: Date, default: Date.now}

    }, {collection: "project.photo"});

    return photoSchema;
};