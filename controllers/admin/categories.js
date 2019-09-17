const Categories = require("../../models/Categories");
const UsersInfo = require("../../models/UsersInfo");

module.exports = async (req, res) => {
    var currentUser = req.user;
    var userInfo = await UsersInfo.findOne({ where: { userId: req.user.id } });
    delete currentUser.password;
    currentUser.info = userInfo.dataValues;

    let categories = await Categories.findAll();
    res.render("admin.categories", {
        pageTitle: "Dashboard- Categories",
        pageName: "Categories",
        errors: req.flash("errors"),
        categories,
        currentUser
    });
};