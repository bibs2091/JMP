const UsersInfo = require("../../models/UsersInfo");
const Courses = require("../../models/Courses");
const Progress = require("../../models/Progress");

module.exports = async (req, res) => {
    try {//get current user info
        var currentUser = req.user;
        var userInfo = await UsersInfo.findOne({ where: { userId: req.user.id } });
        delete currentUser.password;
        currentUser.info = userInfo.dataValues;

        //getting the coach courses
        var courses = await Courses.findAll({ where: { author: req.user.id } });

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
            if (progress) {
                var state = progress.state;
            } else {
                state = "start";
            }
            courses[i].state = state;
        }
        res.render("coach.mycourses", {
            pageName: "My Courses",
            pageTitle: currentUser.info.username + " - My Courses",
            currentUser,
            courses
        });
    } catch{
        return res.redirect("/error");
    }
};