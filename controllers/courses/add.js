const Courses = require("../../models/Courses");
const Chapters = require("../../models/Chapters");
const Lectures = require("../../models/Lectures");

module.exports = async (req, res) => {
    let courseDATA = req.body;
    delete courseDATA.courseJSON;
    //create the course
    let course = await Courses.create(courseDATA);
    let courseId = course.dataValues.id;
    //save the cover image
    const { cover } = req.files;
    await cover.mv(__dirname + "/../../public/img/courses/" + courseId + ".jpg");
    res.redirect("/courses/add");
}