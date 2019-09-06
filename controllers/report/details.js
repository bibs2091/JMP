
const Report = require("../../models/Report");
const UsersInfo = require("../../models/UsersInfo");
const Courses = require("../../models/Courses");
module.exports = async (req, res) => {
	try{
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
		}else {			
		reported = await Courses.findOne({
			where :{title :report.indicted}
		});
		}
		// formating the report date
		report.date=report.createdAt.getFullYear() +
		 '-' + ('0' + (report.createdAt.getMonth() + 1)).slice(-2) + 
		 '-' + ('0' + report.createdAt.getDate()).slice(-2)+
		 "  "+(''+report.createdAt).slice(-50,-41);
		return res.render('reportDetails',{
			report,
			reporter,
			reported
		});
	}catch (err){
		console.log(err);
		res.redirect("404");
	}

};

