const WishLists = require("../../models/WishLists");
const Courses = require("../../models/Courses");
const UsersInfo = require("../../models/UsersInfo");
const Progress = require("../../models/Progress");

module.exports = async (req, res) => {
    const userId = req.user.id;
    var wishlist = await WishLists.findAll({ where: { userId } });
    var courses = [];
    for (let i = 0; i < wishlist.length; i++) {
        let course = await Courses.findByPk(wishlist[i].dataValues.courseId);
        courses.push(course);
    }
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
    res.render("user.wishlist", {
        pageName: "My Wishlist",
        pageTitle: "My Wishlist - JMP",
        courses
    });
}