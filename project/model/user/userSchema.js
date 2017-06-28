var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    firstname:String,
    lastname:String,
    email: String,
    google:{
        id: String,
        token: String
    },
    dateCreated: {type: Date, default: Date.now}
}, {collection: "projectUser"});
module.exports = userSchema;