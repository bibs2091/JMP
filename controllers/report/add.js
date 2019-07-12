const Report = require("../../models/Report");
const UsersInfo = require("../../models/UsersInfo");
const Courses = require("../../models/Courses");
const db = require("../../config/database");
db.sync({ forced: true });
module.exports = async (req, res) => {
	try{
			//getting the report data

	let temp = await UsersInfo.findOne({where : {userId : req.user.id}});
	let username = temp.dataValues.username;
	let indictedType = req.params.type
	console.log(indictedType);
	if (indictedType==="User" ){
	user = await UsersInfo.findOne({where : {userId : req.params.id}});
	var indicted = user.dataValues.username;
	}
	else if(indictedType==="Course"){
	user = await Courses.findOne({where : {id : req.params.id}});
	var indicted = user.dataValues.title;
	console.log(indicted);	
	}
	let type = req.body.type;
	let reportDetails = req.body.reportDetails
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
			console.log("you already had reported this \n wait till the admin read it");
			return res.redirect("/");
		}
	// adding the report
	await Report.create({username,type,indictedType,indicted,reportDetails});
	console.log("report added");
	res.redirect("/");
	}catch (err){
		console.log(err);
		res.redirect("404");
	}

};