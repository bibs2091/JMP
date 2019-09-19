const Progress = require("../../models/Progress");
const Courses = require("../../models/Courses");
const UsersInfo = require("../../models/UsersInfo");
const WishLists = require("../../models/WishLists");

module.exports = async (req, res) => {
    //get the current user
    var currentUser = req.user;
    var userInfo = await UsersInfo.findOne({ where: { userId: req.user.id } });
    delete currentUser.password;
    currentUser.info = userInfo.dataValues;

    //getting the courses ids
    var pCourses = await Progress.findAll({
        where: { userId: req.user.id },
        order: [['state', 'DESC']]
    });

    //looping throw progresses and get courses
    var courses = [];
    for (let i = 0; i < pCourses.length; i++) {
        var course = await Courses.findByPk(pCourses[i].dataValues.courseId);
        courses.push(course);
    }
    console.log(courses);
    //making courses ready for displaying
    for (let i = 0; i < courses.length; i++) {
        courses[i] = courses[i].dataValues;
        var duration = "";
        var author = await UsersInfo.findOne({ where: { userId: courses[i].author } });
        courses[i].author = author.firstName + " " + author.lastName;
        courses[i].duration = Math.floor(courses[i].duration / 60);
        if (courses[i].duration > 60) {
            duration += Math.floor(courses[i].duration / 60) + " h ";
        }
        duration += courses[i].duration % 60 + " mn";
        courses[i].duration = duration;
        var progress = await Progress.findOne({
            where: {
                userId: req.user.id,
                courseId: courses[i].id
            }
        });
        var wishlist = await WishLists.findOne({
            where: {
                userId: req.user.id,
                courseId: courses[i].id
            }
        });
        if (wishlist) {
            courses[i].wishlist = true;
        } else {
            courses[i].wishlist = false;
        }
        if (progress) {
            var state = progress.state;
        } else {
            state = "start";
        }
        courses[i].state = state;
    }
    res.render("user.mycourses", {
        pageName: "My Courses",
        pageTitle: "My Courses - JMP",
        currentUser,
        courses
    });
}