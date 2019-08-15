const Quizs = require("../../models/Quizs");

module.exports = async (req, res) => {
    var answers = req.body.answers;
    var questionsNumber = answers.length;
    var correctAnswers = 0;
    for (let i = 0; i < answers.length; i++) {
        //getting the question from dB
        let question = await Quizs.findByPk(answers[i].questionId);
        console.log(question.dataValues);
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
        emoji = "Sad";
    } else if (percentage <= 75) {
        rate = "Good job,";
        remark = "You can do better";
        emoji = "like";
    } else {
        rate = "Amazing job,";
        remark = "Keep going big brain";
        emoji = "love";
    }

    res.send({
        percentage,
        rate,
        remark,
        emoji
    });
}