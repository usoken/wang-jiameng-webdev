module.exports = function () {
    var mongoose = require('mongoose');
    var uSchema = require('./userSchema');
    var uModel = mongoose.model('uModel', uSchema);
    uModel.createUser = createUser;
    uModel.findUserById = findUserById;
    uModel.findUserByCredentials = findUserByCredentials;
    uModel.deleteUser = deleteUser;
    uModel.updateUser = updateUser;
    uModel.findUserByUsername = findUserByUsername;
    uModel.findAllUsers = findAllUsers;

    module.exports = uModel;

    return {
        createUser: createUser,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findAllUsers:findAllUsers,
        findUserByGoogleId: findUserByGoogleId
    };
    
    function findAllUsers() {
        return uModel.find({});
    }

    function findUserByGoogleId(googleId) {
        return uModel.findOne({'google.id': googleId});
    }


    function updateUser(userId, newUser) {
        delete newUser.username;
        return uModel.update(
            {_id: userId}, {
                $set: {
                    firstName: newUser.firstName,
                    lastName: newUser.lastName
                }
            });
    }

    function deleteUser(userId) {
        return uModel.remove({_id: userId});
    }

    function findUserByCredentials(username, password) {
        return uModel.findOne({username: username, password: password});
    }

    function findUserById(userId) {
        return uModel.findById(userId);
    }

    function createUser(user) {
        return uModel.create(user);
    }

    function findUserByUsername(userName) {
        return uModel.findOne({
            username: userName
        });
    }

};