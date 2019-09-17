const UsersInfo = require("../../models/UsersInfo");
const Courses = require("../../models/Courses");

module.exports = async (req, res) => {
    var currentUser = req.user;
    var userInfo = await UsersInfo.findOne({ where: { userId: req.user.id } });
    delete currentUser.password;
    currentUser.info = userInfo.dataValues;

    var courses = await Courses.findAll();
    for (let i = 0; i < courses.length; i++) {
        var author = await UsersInfo.findOne({ where: { userId: courses[i].author } });
        courses[i].author = author.firstName + " " + author.lastName;
    }
    res.render("admin.courses", {
        pageName: "Courses",
        pageTitle: "Dashbaord - Courses",
        currentUser,
        courses
    });
}