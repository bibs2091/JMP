const Report = require("../../models/Report");
const Courses = require("../../models/Courses");
const Chapters = require("../../models/Chapters");
const Quizs = require("../../models/Quizs");
const User = require("../../models/Users"); 

module.exports = async (req, res) => {
	var reports = await Report.findAll({
		order: [ [ 'createdAt', 'DESC' ]]
	});
	for(let i=0;i<reports.length;i++){
		if (reports[i].indictedType == "Quiz"){
			console.log(reports[i]);
			const quiz = await Quizs.findOne({
				where :{
					id : reports[i].indictedId
				}
			})
			const chapter = await Chapters.findOne({
				where :{
					id : quiz.chapterId
				}
			});
			const course = await Courses.findOne({
				where : {
					id : chapter.formation
				}
			});
			reports[i].courseName=course.title;

		}
		reports[i].date=reports[i].createdAt.getFullYear() +
		 '-' + ('0' + (reports[i].createdAt.getMonth() + 1)).slice(-2) + 
		 '-' + ('0' + reports[i].createdAt.getDate()).slice(-2)+
		 "  "+(''+reports[i].createdAt).slice(-50,-41);
		
	}

	//console.log(reports);
    res.render("admin.reportCenter", {
    	reports,
        pageName: "Reports Center",
        pageTitle: "Dashboard - Reports Center"
    });
}