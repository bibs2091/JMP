const UsersInfo = require("../../models/UsersInfo");

module.exports = async (req, res) => {
    var currentUser = req.user;
    var userInfo = await UsersInfo.findOne({ where: { userId: req.user.id } });
    delete currentUser.password;
    currentUser.info = userInfo.dataValues;

    res.render("coach.home", {
        pageName: "Home",
        pageTitle: currentUser.info.username + " - Home",
        currentUser
    });
};