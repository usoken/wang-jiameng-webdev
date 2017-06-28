
module.exports = function (app, models) {

    var photoModel =  models.photoModel;

    var multer = require('multer');
    var upload = multer({dest: __dirname + '/../../public/uploads'});
    app.post("/api/upload", upload.single('myFile'), uploadPhoto);
    
    app.post("/api/user/:userId/photo", createPhoto);
    app.get("/api/user/:userId/photo", findPhotosForUser);
    app.get("/api/user/:userId/photoLike", findAllLikePhotoForUser);
    app.get("/api/user/:albumId/findPhotoForAlbum", findPhotoForAlbum);
    app.get("/api/allPhotos", findAllPhotos);
    app.get("/api/photo/:photoId", findPhotoById);
    app.put("/api/photo/:photoId", updatePhoto);
    app.put("/api/photo/:shareId/:userId", addLike);
    app.put("/api/photo/:photoId/:albumId/addPhotoToAlbum", addPhotoToAlbum);
    app.put("/api/photo/:photoId/:albumId/deletePhotoFromAlbum", deletePhotoFromAlbum);
    
    app.delete("/api/photo/:photoId", deletePhoto);
    app.delete("/api/photo/:photoId/:userId", deleteLike);

    app.post("/api/user/flickr", createFlickr);


    function createPhoto(req, res) {
        var newPhoto = req.body;
        var userId = req.params.userId;
        photoModel
            .createPhoto(userId, newPhoto)
            .then(
                function (Photo) {
                    res.json(Photo);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );

    }

    function createFlickr(req,res) {
        var photoUrl = req.params.photoUrl;
        var photoId = req.params.photoId;
        var newPhoto = {
            url : photoUrl
        };
        photoModel.updatePhoto(photoId, newPhoto).then (function (status) {
            res.send(200);
        });
    }
    function addPhotoToAlbum(req, res) {
        var photoId = req.params.photoId;
        var albumId = req.params.albumId;
        photoModel
            .addPhotoToAlbum(photoId, albumId)
            .then (function (status) {
                res.sendStatus(200);
            }, function (error) {
                res.status(400).send(error);
            });
    }
    
    function deletePhotoFromAlbum(req, res) {
        var photoId = req.params.photoId;
        var albumId = req.params.albumId;
        photoModel
            .deletePhotoFromAlbum(photoId, albumId)
            .then (function (status) {
                res.sendStatus(200);
            }, function (error) {
                res.status(400).send(error);
            });
    }
    
    function findPhotoForAlbum(req, res) {
        var albumId = req.params.albumId;
        photoModel
            .findPhotoForAlbum(albumId)
            .then(function (photos) {
                res.json(photos);
            },
            function (error) {
                res.status(400).send(error);
            });
        
    }

    function uploadPhoto(req, res) {
        var myFile = req.file;
        var photoId = req.body.photoId;
        var name = req.body.name;
        var description = req.body.description;
        var userId = req.body.userId;
        var type = req.body.type;
        var shareId = req.body.shareId;
        if(myFile == null) {
            console.log("ERROR: NO FILE");
        }
        else {
            var originalname = myFile.originalname; // file name on user's computer
            var filename = myFile.filename;     // new file name in upload folder
            var path = myFile.path;         // full path of uploaded file
            var destination = myFile.destination;  // folder where file is saved to
            var size = myFile.size;
            var mimetype = myFile.mimetype;
            console.log("url");
            var newPhoto = {
                url:   "/uploads/" + filename,
                name: name,
                description: description
            };
            photoModel
                .updatePhoto(photoId, newPhoto)
                .then(function (photo) {;

                // Todo: change type to photo
                    res.redirect("/project/index.html#!/user/" + userId
                        +"/shares/" + type +"/"+ shareId + "/edit");

                }, function (error) {
                    res.status(400).send(error);
                });

        }
    }



    function findPhotosForUser(req, res) {
        var userId = req.params.userId;
        photoModel
            .findPhotosForUser(userId)
            .then(function (photos) {
                res.json(photos);
            }, function (error) {
                res.status(404).send(error);
            });
    }

    function findAllLikePhotoForUser(req, res) {
        var userId = req.params.userId;
        photoModel
            .findAllLikePhotoForUser(userId)
            .then(function (photos) {
                res.json(photos);
            }, function (error) {
                res.status(404).send(error);
            });
    }
    function findAllPhotos(req, res) {
        photoModel
            .findAllPhoto()
            .then(function (photos) {
                res.json(photos);
            }, function (error) {
                res.status(404).send(error);
            });
    }
    
    function findPhotoById(req, res) {
        var photoId = req.params.photoId;
        photoModel
            .findPhotoById(photoId)
            .then(function (photo) {
                res.json(photo);
            }, function (error) {
                res.status(400).send(error);
            });
    }


    function updatePhoto(req, res) {
        var photoId = req.params.photoId;
        var newPhoto = req.body;
        photoModel
            .updatePhoto(photoId, newPhoto)
            .then(function (photo) {
                res.json(photo);
            }, function (error) {
                res.status(400).send(error);
            });
    }
    
    function addLike(req, res) {
        var shareId = req.params.shareId;
        var userId = req.params.userId;
        photoModel.
            addFollowerToMusic(userId, shareId)
            .then(function (status) {
                res.sendStatus(200);
            }, function (error) {
                res.status(400).send(error);
            });
    }


    function deletePhoto(req, res) {
        var photoId = req.params.photoId;
        photoModel
            .deletePhoto(photoId)
            .then(function (status) {
                res.sendStatus(200);
            }, function (error) {
                res.status(404).send(error);
            });
    }

    function deleteLike(req, res) {
        var photoId = req.params.photoId;
        var userId = req.params.userId;
        photoModel
            .deleteLike(photoId, userId)
            .then(function (status) {
                res.sendStatus(200);
            }, function (error) {
                res.status(404).send(error);
            });
    }
};