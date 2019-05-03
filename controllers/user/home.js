const Progress = require("../../models/Progress");
const Courses = require("../../models/Courses");
const UsersInfo = require("../../models/UsersInfo");

module.exports = async (req, res) => {
    var currentUser = req.user;
    var userInfo = await UsersInfo.findOne({ where: { userId: req.user.id } });
    delete currentUser.password;
    currentUser.info = userInfo.dataValues;
    var courses = await Courses.findAll({ limit: 3 });
    console.log(courses);
    res.render("user.home", {
        pageName: "Home",
        pageTitle: "username - Home",
        currentUser,
        courses
    });
};