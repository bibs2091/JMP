const Courses = require("../../models/Courses");
const Chapters = require("../../models/Chapters");
const Lectures = require("../../models/Lectures");
const UsersInfo = require("../../models/UsersInfo");

module.exports = async (req, res) => {
    var courseId = req.params.id;
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
    res.render("courses.courseDetails", {
        pageName: "Course Details",
        pageTitle: course.title + " - JMP",
        course,
        author,
        chaptersList
    });
}