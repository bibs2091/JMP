const Courses = require("../../models/Courses");
const Chapters = require("../../models/Chapters");
const Lectures = require("../../models/Lectures");

module.exports = async (req, res) => {
    let courseId = req.params.id;
    let courseDATA = req.body;
    let courseJSON = JSON.parse(req.body.courseJSON);
    delete courseDATA.courseJSON;
    //update the course basic info
    await Courses.update(courseDATA, { where: { id: courseId } });

    //upadate the cover image
    if (req.files) {
        const { cover } = req.files;
        await cover.mv(__dirname + "/../../public/img/courses/" + courseId + ".jpg");
    }

    //find all chapters related to the course
    var chaps = await Chapters.findAll({ where: { formation: courseId } });

    //delete all lectures related to the chapters
    for (let i = 0; i < chaps.length; i++) {
        await Lectures.destroy({ where: { chapter: chaps[i].id } });
    }

    //delete all chapter
    await Chapters.destroy({ where: { formation: courseId } });


    //adding chapters and lectures
    var currentChapter = {};
    for (let i = 0; i < courseJSON.length; i++) {
        currentChapter = courseJSON[i];
        let chapter = await Chapters.create({
            title: currentChapter.title,
            formation: courseId
        });
        let chapterId = chapter.dataValues.id;
        var lectures = currentChapter.lectures;
        for (let j = 0; j < lectures.length; j++) {
            var currentLecture = {};
            currentLecture = lectures[j];
            currentLecture.chapter = chapterId;
            let lecture = await Lectures.create(currentLecture);
        }
    }
    res.redirect("/courses/" + courseId);
}