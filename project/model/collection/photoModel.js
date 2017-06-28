module.exports = function () {
    var mongoose = require("mongoose");
    var photoSchema = require("./photoSchema.js")();
    var photoModel = mongoose.model("photoSchema", photoSchema);

    var api = {
        createPhoto:createPhoto,
        findPhotoById: findPhotoById,
        findPhotosForUser: findPhotosForUser,
        updatePhoto: updatePhoto,
        deletePhoto: deletePhoto,
        findAllPhoto: findAllPhoto,
        findPhotoForAlbum: findPhotoForAlbum,
        deletePhotoFromAlbum: deletePhotoFromAlbum,
        addPhotoToAlbum:  addPhotoToAlbum,

        findAllLikePhotoForUser: findAllLikePhotoForUser,
        addFollowerToMusic: addFollowerToMusic,
        deleteLike:  deleteLike

    };
    return api;

    function createPhoto(userId, photo) {
        photo._user = userId;
        return photoModel.create(photo);

    }

    function findPhotosForUser(userId) {
        return photoModel.find({_user: userId});
    }


    function findPhotoById(photoId) {
        return photoModel.findOne({_id: photoId});
    }

    function updatePhoto(photoId, photo) {
        return photoModel.update(
            {_id: photoId},
            {$set :
                {
                    name: photo.name,
                    description: photo.description,
                    url: photo.url
                }
            });
    }

    function deletePhoto(photoId) {
        return photoModel.remove({_id: photoId});
    }

    function findAllPhoto() {
        return photoModel.find({});
    }



    function findAllLikePhotoForUser(userId) {
        return photoModel.find({followers: userId})
    }


    function findPhotoForAlbum(albumId) {
        return photoModel.find({belongsTo: albumId});
    }


    function addPhotoToAlbum(photoId, albumId) {
        return photoModel.update(
            {_id: photoId},
            {$addToSet: { belongsTo: albumId}}
        );
    }

    function addFollowerToMusic(userId, musicId) {
        return photoModel.update(
            {_id: musicId},
            { $addToSet: { followers: userId}}
        );
    }

    function deletePhotoFromAlbum(photoId, albumId) {
        console.log("into modelService");
        return photoModel.update(
            {_id: photoId},
            {$pull: { belongsTo: albumId}}
        );
    }

    function deleteLike(photoId, userId) {
        return photoModel.findOneAndUpdate(
            {_id: photoId},
            {$pull: {followers: userId}
            }
        );
    }


};