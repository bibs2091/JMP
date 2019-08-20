const Courses = require("../../models/Courses");
const Chapters = require("../../models/Chapters");
const Lectures = require("../../models/Lectures");


module.exports = async (req, res) => {
    var courseId = req.params.id;
    var course = await Courses.findByPk(courseId);
    var chaptersList = [];
    var chaps = await Chapters.findAll({ where: { formation: courseId } });
    for (let i = 0; i < chaps.length; i++) {
        var currentChap = {};
        currentChap.title = chaps[i].title;
        var lects = await Lectures.findAll({ where: { chapter: chaps[i].id } });
        var currentLects = [];
        for (let j = 0; j < lects.length; j++) {
            var obj = {};
            obj.title = lects[j].title;
            obj.description = lects[j].description;
            obj.type = lects[j].type;
            obj.link = lects[j].link;
            currentLects.push(obj);
        };
        currentChap.lectures = currentLects;
        chaptersList.push(currentChap);
    };
    course.tags = JSON.parse(course.tags);
    res.render("courses.update", {
        pageName: "Course Details",
        pageTitle: course.title + " - JMP",
        course,
        chaptersList
    });
}