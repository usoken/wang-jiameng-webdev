module.exports = function (app) {

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    var pages = [

        { "_id": "321", "name": "Post 1", "websiteId": "456", "title": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "title": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "title": "Lorem" }

    ];

    function createPage(req, res) {
        var page = req.body;
        var websiteId = req.params["websiteId"];
        page._id = (new Date()).getTime() + "";
        page.websiteId = websiteId;
        pages.push(page);

    }

    function findAllPagesForWebsite(req, res) {
        var resultSet = [];
        for(var p in pages) {
            if(pages[p].websiteId === req.params.websiteId) {
                resultSet.push(pages[p]);
            }
        }
        res.json(resultSet);
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        // var page = pages.find(function (page) {
        //     return page._id === pageId;
        // });
        for (var p in pages) {
            if (page[p]._id === pageId) {
                res.json(page[p]);
                return;
            }
        }
        res.send("0");
    }

    function updatePage(req, res) {
        var page = req.body;
        var pageId = req.params.pageId;
        for (var p in pages) {
            if (pages[v]._id === pageId) {
                pages[v] = page;
                res.sendStatus(200);
                return;
            }
        }
    }

    function deletePage(req, res) {
        var pageId = req.params["pageId"];
        var page = pages.find(function (page) {
            return page._id === pageId;
        });
        var index = pages.indexOf(page);
        pages.splice(index, 1);
        res.json(pages);
    }
};
