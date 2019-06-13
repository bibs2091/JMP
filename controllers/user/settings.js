const UsersInfo = require("../../models/UsersInfo");

module.exports = async (req, res) => {
    //get the current user
    var currentUser = req.user;
    var userInfo = await UsersInfo.findOne({ where: { userId: req.user.id } });
    delete currentUser.password;
    currentUser.info = userInfo.dataValues;

    res.render("user.editprofile2", {
        pageTitle: "Profile settings",
        pageName: "Profile Settings",
        currentUser
    });
}