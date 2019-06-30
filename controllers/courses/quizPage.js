const Courses = require("../../models/Courses");
const Chapters = require("../../models/Chapters");
const Lectures = require("../../models/Lectures");
const Progress = require("../../models/Progress");

module.exports = async (req, res) => {
    var courseId = req.params.courseId;
    var chapId = req.params.chapId;

    var newProgress = await Progress.findOne({
        where: {
            userId: req.user.id,
            courseId
        }
    });
    var chaptersList = [];
    var chaps = await Chapters.findAll({ where: { formation: courseId } });
    var firstLecture = {};
    var lastLecture = {};
    for (let i = 0; i < chaps.length; i++) {
        var currentChap = {};
        currentChap.title = chaps[i].title;
        currentChap.id = chaps[i].id;
        var lects = await Lectures.findAll({ where: { chapter: chaps[i].id } });
        var currentLects = [];
        for (let j = 0; j < lects.length; j++) {
            if (i == 0 && j == 0) {
                firstLecture = lects[j].dataValues;
            }
            if (i == chaps.length - 1 && j == lects.length - 1) {
                lastLecture = lects[j].dataValues;
            }
            let obj = {};
            obj.id = lects[j].id;
            obj.title = lects[j].title;
            currentLects.push(obj);
        };
        currentChap.lectures = currentLects;
        chaptersList.push(currentChap);
    };

    res.render("courses.quiz", {
        chaptersList,
        lastLecture,
        newProgress,
        courseId
    });
}