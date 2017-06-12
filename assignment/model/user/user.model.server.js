module.exports = function () {
    var mongoose = require('mongoose');
    var userSchema = require('./user.schema.server');
    var userModel = mongoose.model('userModel', userSchema);
    userModel.createUser = createUser;
    userModel.findUserById = findUserById;
    userModel.findUserByCredentials = findUserByCredentials;
    userModel.deleteUser = deleteUser;
    userModel.updateUser = updateUser;
    userModel.findUserByUsername = findUserByUsername;

    module.exports = userModel;

    function updateUser(userId, newUser) {
        delete newUser.username;
        return userModel.update({_id: userId}, {
            $set: {
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                phone: newUser.phone
            }
        });
    }

    function deleteUser(userId) {
        return userModel.remove({_id: userId});
    }

    function findUserByCredentials(username, password) {
        return userModel.findOne({username: username, password: password});
    }

    function findUserById(userId) {
        return userModel.findById(userId);
    }

    function createUser(user) {
        return userModel.create(user);
    }
    
    function findUserByUsername(userName) {
        return userModel.findOne({
           userName: userName
        });
    }

};