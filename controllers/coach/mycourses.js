const UsersInfo = require("../../models/UsersInfo");
const Courses = require("../../models/Courses");

module.exports = async (req, res) => {
    //get current user info
    var currentUser = req.user;
    var userInfo = await UsersInfo.findOne({ where: { userId: req.user.id } });
    delete currentUser.password;
    currentUser.info = userInfo.dataValues;

    //getting the coach courses
    var courses = await Courses.findAll({ where: { author: req.user.id } });

    res.render("coach.mycourses", {
        pageName: "My Courses",
        pageTitle: currentUser.info.username + " - My Courses",
        currentUser
    });
};