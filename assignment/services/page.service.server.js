module.exports = function (app, models) {

    var pageModel = models.pageModel;

    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/page/:pageId", findPageById);
    app.get("/api/website/:websiteId/page", findPagesByWebsiteId);
    app.put("/api/page/:pageId", updatePage);
    app.delete('/api/page/:pageId', deletePage);

    function createPage(req, res) {
        var websiteId = req.body.websiteId;
        var page = req.body;
        var name = req.body.page.name;
        var description = req.body.page.description;
        page.name = name;
        page.description = description;
        page._website = websiteId;

        pageModel
            .createPage(page)
            .then(
                function (page) {
                    res.sendStatus(200);
                }
            );
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        pageModel
            .findPageById(pageId)
            .then(
                function (page) {
                    res.json(page);
                },
                function (err) {
                    res.send(null);
                }
            );
    }

    function findPagesByWebsiteId(req, res) {
        pageModel
            .findPagesByWebsiteId(req.params.websiteId)
            .then(function (websites) {
                res.json(websites);
            });
    }

    function updatePage(req, res) {
        var pageId = req.params['pageId'];
        var page = req.body.page;

        pageModel
            .updatePage(pageId, page)
            .then(function (response) {
                res.json(response);
            });
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        pageModel
            .deletePage(pageId)
            .then(function (status) {
                    res.json(200);
                }
            );
    }
};
