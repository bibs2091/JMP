const Categories = require("../../models/Categories");

module.exports = async (req, res) => {
    let categories = await Categories.findAll();
    res.render("admin.categories", {
        pageTitle: "Dashboard- Categories",
        pageName: "Categories",
        errors: req.flash("errors"),
        categories
    });
};