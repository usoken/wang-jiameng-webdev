var mongoose = require('mongoose');
var pageSchema = mongoose.Schema({
    _website : {type: mongoose.Schema.ObjectId, ref: "websiteModel"},
    name: String,
    title: String,
    description: String,
    widgets:{type: mongoose.Schema.ObjectId, ref: "widgetModel"},
    dateCreated: {type: Date, default: Date.now}
}, {collection: 'widget'});
module.exports = pageSchema;