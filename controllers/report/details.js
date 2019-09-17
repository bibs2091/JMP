
const Report = require("../../models/Report");
const UsersInfo = require("../../models/UsersInfo");
const Courses = require("../../models/Courses");
const Chapters = require("../../models/Chapters");
const Quizs = require("../../models/Quizs");
module.exports = async (req, res) => {
	try{
		var currentUser = req.user;
        var userInfo = await UsersInfo.findOne({ where: { userId: req.user.id } });
        delete currentUser.password;
        currentUser.info = userInfo.dataValues;
		// getting report,reporter and reported data
		var report = await Report.findOne({
			where :{id : req.params.id}
		});
		
		const reporter = await UsersInfo.findOne({
			where :{username :report.username}
		});
		var reported;
		if (report.indictedType =="User"){
		reported = await UsersInfo.findOne({
			where :{username :report.indicted}});	
		}else if (report.indictedType =="Course"){			
		reported = await Courses.findOne({
			where :{title :report.indicted}
		});
		}else{
			const quiz = await Quizs.findOne({
				where :{
					id : report.indictedId
				}
			});
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
			reported=course;

		}
		// formating the report date
		report.date=report.createdAt.getFullYear() +
		 '-' + ('0' + (report.createdAt.getMonth() + 1)).slice(-2) + 
		 '-' + ('0' + report.createdAt.getDate()).slice(-2)+
		 "  "+(''+report.createdAt).slice(-50,-41);
		return res.render('reportDetails',{
			currentUser,
			report,
			reporter,
			reported
		});
	}catch (err){
		console.log(err);
		res.redirect("404");
	}

};

