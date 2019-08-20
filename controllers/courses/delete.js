const Courses = require("../../models/Courses");
const Chapters = require("../../models/Chapters");
const Lectures = require("../../models/Lectures");
const fs = require('fs');

module.exports = async (req, res) => {
    var courseId = req.params.id;
    //delete the picture
    await fs.unlink(__dirname + '/../../public/img/courses/' + courseId + ".jpg", () => {
        console.log("deleted");
    });

    //delte the course
    await Courses.destroy({ where: { id: courseId } });

    //find all chapters related to the course
    var chaps = await Chapters.findAll({ where: { formation: courseId } });

    //delete all lectures related to the chapters
    for (let i = 0; i < chaps.length; i++) {
        await Lectures.destroy({ where: { chapter: chaps[i].id } });
    }

    //delete all chapter
    await Chapters.destroy({ where: { formation: courseId } });

    res.send({ success: true });
}