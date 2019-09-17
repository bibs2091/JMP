const Report = require("../../models/Report");
const UsersInfo = require("../../models/UsersInfo");
const Courses = require("../../models/Courses");
const Quizs = require("../../models/Quizs");
const db = require("../../config/database");
db.sync({ forced: true });
module.exports = async (req, res) => {
	try{
			//getting the report data
	var quiz = null;
	let temp = await UsersInfo.findOne({where : {userId : req.user.id}});
	let username = temp.dataValues.username;
	let indictedType = req.params.type
	let type = req.body.type;
	let reportDetails = req.body.reportDetails;
	var indictedId = null;
	if (indictedType==="User" ){
	let user = await UsersInfo.findOne({where : {userId : req.params.id}});
	var indicted = user.dataValues.username;
	indictedId = user.dataValues.id;
	}
	else if(indictedType==="Course"){
	let course = await Courses.findOne({where : {id : req.params.id}});
	var indicted = course.dataValues.title;
	indictedId = course.dataValues.id;
	}else if(indictedType==="Quiz"){
	quiz = await Quizs.findOne({where : {chapterId : req.params.id}});
	var indicted = quiz.dataValues.title;
	indictedId = quiz.dataValues.id;
	}
	else {
		return res.redirect('404');
	}
	
	const report = await Report.findAll({
			limit: 1,
			where:{
				username,
				type,
				indictedType,
				indicted
			},
			order: [ [ 'createdAt', 'DESC' ]]
			
		});
	
	// if the report already exists and the admin didn't read it yet
	if(report.length>0)
		if(report[0].dataValues.read === false){
			req.flash("reportNotAdded","you already had reported this, wait till the admin read it");
			return res.redirect(req.headers.referer.slice(21));
		}
	// adding the report

		await Report.create({username,type,indictedType,indictedId,indicted,reportDetails});
	

	req.flash("reportAdded","your report had been sent to the admins");	
	res.redirect(req.headers.referer.slice(21));
	}catch (err){
		console.log(err);
		res.redirect("404");
	}

};