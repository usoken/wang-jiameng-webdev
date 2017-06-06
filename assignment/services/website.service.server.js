module.exports = function (app) {

    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
        { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
    ];

    function createWebsite(req, res) {
        var website = req.body;
        var developerId = req.params["userId"];
        website._id = (new Date()).getTime() + "";
        website.developerId = developerId;
        websites.push(website);
        // res.json(website);

    }

    function findAllWebsitesForUser(req, res) {
        var resultSet = [];
        for(var w in websites) {
            if(websites[w].developerId === req.params.userId) {
                resultSet.push(websites[w]);
            }
        }
        res.json(resultSet);
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        var website = websites.find(function (website) {
            return website._id === websiteId;
        });
        res.send(website);

    }

    function updateWebsite(req, res) {
        var website = req.body;
        var websiteId = req.params.websiteId;
        for (var v in websites) {
            if (websites[v]._id === websiteId) {
                websites[v] = website;
                res.sendStatus(200);
                return;
            }
        }
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params["websiteId"];
        var website= websites.find(function (website) {
            return website._id === websiteId;
        });
        var index = websites.indexOf(website);
        websites.splice(index, 1);
        res.json(websites);
    }

};
