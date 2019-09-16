module.exports = (req, res) => {
    console.log(req.query);
    return res.render("search", {
        pageName: "search results",
        pageTitle: "search for ..."
    })
}