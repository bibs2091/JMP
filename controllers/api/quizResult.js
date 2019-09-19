const Quizs = require("../../models/Quizs");
const Progress = require("../../models/Progress");
const Lectures = require("../../models/Lectures");
const axios = require('axios');

module.exports = async (req, res) => {
    var courseId = req.body.courseId;
    var answers = req.body.answers;
    var questionsNumber = answers.length;
    var correctAnswers = 0;
    for (let i = 0; i < answers.length; i++) {
        //getting the question from dB
        let question = await Quizs.findByPk(answers[i].questionId);
        if (answers[i].answer == question.answer)
            correctAnswers++;
    }
    var percentage = parseInt((correctAnswers / questionsNumber) * 100);
    var rate, remark, emoji;
    if (percentage < 25) {
        rate = "Bad!!!";
        remark = "You must work harder";
        emoji = "angry";
    } else if (percentage <= 50) {
        rate = "Not Bad,";
        remark = "Must improve work habits";
        emoji = "sad";
    } else if (percentage <= 75) {
        rate = "Good job,";
        remark = "You can do better";
        emoji = "like";
    } else {
        rate = "Amazing job,";
        remark = "Keep going big brain";
        emoji = "love";
    }
    //getting the user id
    var userId = req.user.id;
    //getting the user progress
    var progress = await Progress.findOne({
        where: {
            userId,
            courseId
        }
    });
    //getting last lecture
    var lastLect = await axios.get(`http://5cc87506.ngrok.io/api/course/${courseId}/lastLecture`);
    lastLect = lastLect.data.id;
    //updating the user progress
    let lect = await Lectures.findByPk(progress.lastLecture + 1);
    if (lect && lect.type == "quiz") {
        await Progress.update({ lastLecture: progress.lastLecture + 1 }, {
            where: {
                userId,
                courseId
            }
        });
        if (progress.lastLecture + 1 == lastLect)
            await Progress.update({ state: "finished" }, {
                where: {
                    userId,
                    courseId
                }
            });
    }
    res.send({
        percentage,
        rate,
        remark,
        emoji
    });
}