const Courses = require("../../models/Courses");
const Chapters = require("../../models/Chapters");
const Lectures = require("../../models/Lectures");
const Progress = require("../../models/Progress");

module.exports = async (req, res) => {
    try {
        var courseId = req.params.course;
        var progress = await Progress.findOne({
            where: {
                userId: req.user.id,
                courseId
            }
        });
        var content = await Lectures.findByPk(req.params.lecture);
        if (!content) {
            return res.render("404");
        }
        if (req.params.lecture == progress.lastLecture + 1) {
            await Progress.update({ lastLecture: req.params.lecture }, {
                where: {
                    userId: req.user.id,
                    courseId
                }
            });
        } else if (req.params.lecture > progress.lastLecture) {
            return res.render("404");
        }
        var newProgress = await Progress.findOne({
            where: {
                userId: req.user.id,
                courseId
            }
        });
        var course = await Courses.findByPk(courseId);
        var chaptersList = [];
        var chaps = await Chapters.findAll({ where: { formation: courseId } });
        for (let i = 0; i < chaps.length; i++) {
            var currentChap = {};
            currentChap.title = chaps[i].title;
            var lects = await Lectures.findAll({ where: { chapter: chaps[i].id } });
            var currentLects = [];
            for (let j = 0; j < lects.length; j++) {
                let obj = {};
                obj.id = lects[j].id;
                obj.title = lects[j].title;
                currentLects.push(obj);
            };
            currentChap.lectures = currentLects;
            chaptersList.push(currentChap);
        };


        res.render("courses.course", {
            pageTitle: content.title,
            chaptersList,
            content,
            newProgress,
            courseId
        });
    }
    catch (err) {
        console.log(err);
        res.redirect("/error");
    }

}