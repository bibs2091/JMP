const Courses = require("../../models/Courses");
const Chapters = require("../../models/Chapters");
const Lectures = require("../../models/Lectures");
const Quizs = require("../../models/Quizs");
const Suggestions = require("../../models/Suggestions");
// const videoInfo = require("youtube-info");

module.exports = async (req, res) => {
    try {
        let courseDATA = req.body;
        let courseJSON = JSON.parse(req.body.courseJSON);
        courseDATA.category = parseInt(courseDATA.category);
        let quizsJSON = JSON.parse(req.body.quizs);
        courseDATA.author = req.user.id;
        delete courseDATA.quizs;
        delete courseDATA.courseJSON;

        //create the course
        let course = await Courses.create(courseDATA);
        let courseId = course.dataValues.id;

        //save the cover image
        const { cover } = req.files;
        await cover.mv(__dirname + "/../../public/img/courses/" + courseId + ".jpg");
        await Courses.update({ cover: "/img/courses/" + courseId + ".jpg" }, {
            where: { id: courseId }
        });
        //adding chapter
        var currentChapter = {};
        var pdfs = 0;
        var duration = 0;
        for (let i = 0; i < courseJSON.length; i++) {
            currentChapter = courseJSON[i];
            let chapter = await Chapters.create({
                title: currentChapter.title,
                formation: courseId
            });
            let chapterId = chapter.dataValues.id;
            let currentQuiz = quizsJSON[i];
            for (let k = 0; k < currentQuiz.length; k++) {
                let question = currentQuiz[k];
                let suggestions = question.suggestions;
                delete question.suggestions;
                question.chapterId = chapterId;
                let quiz = await Quizs.create(question);
                for (let m = 0; m < suggestions.length; m++) {
                    await Suggestions.create({
                        content: suggestions[m],
                        quizId: quiz.id
                    })
                }
            }
            var lectures = currentChapter.lectures;
            for (let j = 0; j < lectures.length; j++) {
                var currentLecture = {};
                currentLecture = lectures[j];
                if (currentLecture.type == "PDF") {
                    pdfs++;
                } else {
                    var videoID = currentLecture.link.split("v=")[1];
                    // var vidInfo = await videoInfo(videoID);
                    // duration += vidInfo.duration;
                }
                currentLecture.chapter = chapterId;
                let lecture = await Lectures.create(currentLecture);
            }
        }
        await Courses.update({
            pdfs,
        }, { where: { id: courseId } });
        res.redirect("/courses/" + courseId);
    } catch (error) {
        console.log(error);
        res.redirect("/error");
    }
}