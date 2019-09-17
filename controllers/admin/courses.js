const UsersInfo = require("../../models/UsersInfo");

module.exports = async (req, res) => {
    var currentUser = req.user;
    var userInfo = await UsersInfo.findOne({ where: { userId: req.user.id } });
    delete currentUser.password;
    currentUser.info = userInfo.dataValues;

    res.render("admin.courses", {
        pageName: "Courses",
        pageTitle: "Dashbaord - Courses",
        currentUser
    });
}