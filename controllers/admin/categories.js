module.exports = (req, res) => {
    res.render("admin.categories", {
        pageTitle: "Dashboard- Categories",
        pageName: "Categories"
    });
};