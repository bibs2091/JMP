const Progress = require("../../models/Progress");
const Courses = require("../../models/Courses");
const UsersInfo = require("../../models/UsersInfo");
const WishLists = require("../../models/WishLists");

module.exports = async (req, res) => {
    var currentUser = req.user;
    var userInfo = await UsersInfo.findOne({ where: { userId: req.user.id } });
    delete currentUser.password;
    currentUser.info = userInfo.dataValues;
    res.render("user.mycourses", {
        pageName: "My Courses",
        pageTitle: "My Courses - JMP",
        currentUser
    });
}