const Chapters = require("../../models/Chapters");
const Lectures = require("../../models/Lectures");
const Progress = require("../../models/Progress");

module.exports = async (req, res) => {
    try {
        var courseId = req.params.id;
        var progress = await Progress.findOne({
            where: {
                userId: req.user.id,
                courseId
            }
        });
        if (progress) {
            return res.redirect("/courses/classroom/" + courseId + "/" + progress.lastLecture);
        } else {
            //getting the first chapter on the course
            var chaps = await Chapters.findAll({ where: { formation: courseId } });
            var lect = await Lectures.findAll({ where: { chapter: chaps[0].id } });
            await Progress.create({
                userId: req.user.id,
                courseId,
                state: "resume",
                lastLecture: lect[0].id
            });
            return res.redirect("/courses/classroom/" + courseId + "/" + lect[0].id);
        }
    } catch {
        res.redirect("/error");
    }
}