const Progress = require("../../models/Progress");
const Courses = require("../../models/Courses");
const UsersInfo = require("../../models/UsersInfo");

module.exports = async (req, res) => {
    var courseId = req.params.course;
    //getting the course
    var course = await Courses.findByPk(courseId);
    //getting the user info
    var info = await UsersInfo.findOne({ where: { userId: req.user.id } });

    var progress = await Progress.findOne({
        where: {
            userId: req.user.id,
            courseId
        }
    });
    if (progress) {
        if (progress.state == "finished") {
            return res.render("courses.certificat", {
                courseName: course.dataValues.title,
                userName: info.dataValues.firstName + " " + info.dataValues.lastName
            });
        }
    }
    return res.render("404");
}