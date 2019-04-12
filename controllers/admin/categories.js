module.exports = (req, res) => {
    res.render("admin.categories", {
        pageTitle: "Dashboard- Categories",
        pageName: "Categories",
        errors: req.flash("errors")
    });
};