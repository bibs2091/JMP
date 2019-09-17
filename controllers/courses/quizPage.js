const Chapters = require("../../models/Chapters");
const Lectures = require("../../models/Lectures");
const Progress = require("../../models/Progress");
const Quizs = require("../../models/Quizs");
const Suggestions = require("../../models/Suggestions");

module.exports = async (req, res) => {
    var courseId = req.params.courseId;
    var chapId = req.params.chapId;
    var next;
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
            if (chapId == currentChap.id) {
                if (j == lects.length - 1) {
                    next = obj.id + 1;
                }
                if (i == chaps.length - 1) {
                    next = "certificat"
                }
            }
        };
        currentChap.lectures = currentLects;
        chaptersList.push(currentChap);
    };
    //getting the questions
    var questions = await Quizs.findAll({
        where: {
            chapterId: chapId
        }
    });
    for (let n = 0; n < questions.length; n++) {
        questions[n] = questions[n].dataValues;
        let suggestions = await Suggestions.findAll({
            where: {
                quizId: questions[n].id
            }
        });
        let rsugg = []
        for (let j = 0; j < 4; j++) {
            rsugg.push(suggestions[j].content);
        }
        questions[n].suggestions = rsugg;
        questions[n].index = n;
    }
    var nextLink;
    if (next == "certificat") {
        nextLink = "/courses/classroom/" + courseId + "/certificat"
    } else {
        nextLink = "/courses/classroom/" + courseId + "/" + next;
    }
    let messages = req.flash();
            if (Object.keys(messages).length === 0) {
                messages = undefined;
            }
    res.render("courses.quiz", {
        messages,
        chaptersList,
        lastLecture,
        newProgress,
        courseId,
        questions,
        quizId: chapId,
        pageTitle: "JMP - Quiz",
        nextLink,
        next
    });
}