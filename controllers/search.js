const UsersInfo = require("../models/UsersInfo");

module.exports = async (req, res) => {
    var currentUser = req.user;
    var userInfo = await UsersInfo.findOne({ where: { userId: req.user.id } });
    delete currentUser.password;
    currentUser.info = userInfo.dataValues;

    var query = req.query.q;
    return res.render("search", {
        pageName: "Search Results",
        pageTitle: query,
        currentUser
    });
}