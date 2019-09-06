const Report = require("../../models/Report");
const UsersInfo = require("../../models/UsersInfo");
const Courses = require("../../models/Courses");
module.exports = async (req, res) => {
	try{
		//get the report infos
		let report = await Report.findOne({
			where :{
				id:req.params.id
			}
		});
		//format the report date
		report.date = report.createdAt.getFullYear() +
		 '-' + ('0' + (report.createdAt.getMonth() + 1)).slice(-2) + 
		 '-' + ('0' + report.createdAt.getDate()).slice(-2)+
		 "  "+(''+report.createdAt).slice(-50,-41);
		 // get infos of the reporter
		const reporter = await UsersInfo.findOne({
			where:{username:report.username}
		})
		// get infos of the reported
		let reported = undefined;
		if (report.indictedType =="User")
			reported = await UsersInfo.findOne({
			where:{username:report.indicted}
		})
		else 
			reported = await Courses.findOne({
			where:{title:report.indicted}
		})
		
		

		return res.render("reportDetails",{
			report,
			reporter,
			reported
		})
}catch (err){
		console.log(err);
		res.redirect("404");
	}

};