var mongoose = require('mongoose');
var widgetSchema = mongoose.Schema({
    _page: {type: mongoose.Schema.ObjectId, ref: 'Page'},
    widgetType: {type: String, enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'TEXT']},
    name: String,
    text: String,
    placeholder: String,
    description: String,
    url: String,
    width: String,
    height: String,
    rows: Number,
    size: Number,
    class: String,
    icon: String,
    deleteable: Boolean,
    formatted: Boolean,
    order: Number,
    dateCreated: {type: Date, default: Date.now}
}, {collection: "widget"});

module.exports = widgetSchema;