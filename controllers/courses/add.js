const Courses = require("../../models/Courses");
const Chapters = require("../../models/Chapters");
const Lectures = require("../../models/Lectures");

module.exports = async (req, res) => {
    let courseDATA = req.body;
    let courseJSON = JSON.parse(req.body.courseJSON);
    delete courseDATA.courseJSON;
    //create the course
    let course = await Courses.create(courseDATA);
    let courseId = course.dataValues.id;
    //save the cover image
    const { cover } = req.files;
    await cover.mv(__dirname + "/../../public/img/courses/" + courseId + ".jpg");
    //adding chapter
    var currentChapter = {};
    for (let i = 0; i < courseJSON.length; i++) {
        currentChapter = courseJSON[i];
        let chapter = await Chapters.create({
            title: currentChapter.title,
            formation: courseId
        });
        let chapterId = chapter.dataValues.id;
        var lectures = currentChapter.lectures;
        var currentLecture = {};
        for (let j = 0; j < lectures.length; j++) {
            currentLecture = lectures[j];
            currentLecture.chapter = chapterId;
            let lecture = await Lectures.create(currentLecture);
        }
    }
    res.redirect("/courses/" + courseId);
}