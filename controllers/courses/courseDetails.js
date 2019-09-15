const Courses = require("../../models/Courses");
const Chapters = require("../../models/Chapters");
const Lectures = require("../../models/Lectures");
const UsersInfo = require("../../models/UsersInfo");
const Wishlists = require("../../models/WishLists");


module.exports = async (req, res) => {
    try {
        var currentUser = req.user;
        var userInfo = await UsersInfo.findOne({ where: { userId: req.user.id } });
        delete currentUser.password;
        currentUser.info = userInfo.dataValues;

        var courseId = req.params.id;
        if (courseId == "worker.js")
            return;
        var course = await Courses.findByPk(courseId);
        if (!course) {
            return res.render("404");
        }
        var author = await UsersInfo.findOne({ where: { userId: course.author } });
        var chaptersList = [];
        var chaps = await Chapters.findAll({ where: { formation: courseId } });
        for (let i = 0; i < chaps.length; i++) {
            var currentChap = {};
            currentChap.title = chaps[i].title;
            var lects = await Lectures.findAll({ where: { chapter: chaps[i].id } });
            var currentLects = [];
            for (let j = 0; j < lects.length; j++) {
                currentLects.push(lects[j].title);
            };
            currentChap.lectures = currentLects;
            chaptersList.push(currentChap);
        };
        var url = req.protocol + '://' + req.get('host') + req.originalUrl;
        var wishlist = await Wishlists.findOne({
            where: {
                userId: req.user.id,
                courseId: courseId
            }
        });
        wishlist = wishlist ? true : false;
        console.log(wishlist);
        course.tags = JSON.parse(course.tags)
        res.render("courses.courseDetails", {
            pageName: "Course Details",
            pageTitle: course.title + " - JMP",
            course,
            author,
            chaptersList,
            url,
            currentUser,
            wishlist
        });
    } catch (error) {
        console.log(error);
        res.redirect("/error");
    }
}