const UsersInfo = require("../../models/UsersInfo");
const Courses = require("../../models/Courses");

module.exports = async (req, res) => {
    //get current user info
    var currentUser = req.user;
    var userInfo = await UsersInfo.findOne({ where: { userId: req.user.id } });
    delete currentUser.password;
    currentUser.info = userInfo.dataValues;

    res.render("coach.home", {
        pageName: "My Courses",
        pageTitle: currentUser.info.username + " - My Courses",
        currentUser
    });
};