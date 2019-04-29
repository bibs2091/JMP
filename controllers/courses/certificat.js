const Progress = require("../../models/Progress");

module.exports = async (req, res) => {
    var courseId = req.params.course;
    var progress = await Progress.findOne({
        where: {
            userId: req.user.id,
            courseId
        }
    });
    if (progress) {
        if (progress.state == "finished") {
            return res.render("courses.certificat");
        }
    }
    return res.render("404");

}