const UsersInfo = require("../../models/UsersInfo");

module.exports = async (req, res) => {
    //get the current user
    let userInfo = await UsersInfo.findOne({ where: { userId: req.user.id } });
    delete userInfo.dataValues.createdAt
    delete userInfo.dataValues.updatedAt
    userInfo = userInfo.dataValues;

    console.log(userInfo);
    res.render("user.editProfile", {
        pageTitle: "Profile settings",
        pageName: "Profile Settings",
        userInfo
    });
}