const Progress = require("../../models/Progress");
const Courses = require("../../models/Courses");
const UsersInfo = require("../../models/UsersInfo");
const WishLists = require("../../models/WishLists");

module.exports = async (req, res) => {
    try {
        var currentUser = req.user;
        var userInfo = await UsersInfo.findOne({ where: { userId: req.user.id } });
        delete currentUser.password;
        currentUser.info = userInfo.dataValues;
        var courses = await Courses.findAll({ limit: 3 });
        for (let i = 0; i < courses.length; i++) {
            courses[i] = courses[i].dataValues;
            var duration = "";
            courses[i].duration = Math.floor(courses[i].duration / 60);
            if (courses[i].duration > 60) {
                duration += Math.floor(courses[i].duration / 60) + " h ";
            }
            duration += courses[i].duration % 60 + " mn";
            courses[i].duration = duration;
            console.log(duration);
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
        res.render("user.home", {
            pageName: "Home",
            pageTitle: "username - Home",
            currentUser,
            courses
        });
    }
    catch{
        return res.redirect("/error");
    }
};