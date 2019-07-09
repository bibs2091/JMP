const Report = require("../../models/Report");
const db = require("../../config/database");
db.sync({ forced: true });
module.exports = async (req, res) => {
	try{
			//getting the report data
	let userId = req.user.id;
	let indictedType = req.params.type
	let indictedId = req.params.id;
	let type = req.body.type;
	let reportDetails = req.body.reportDetails
	const report = await Report.findAll({
		limit: 1,
		where:{
			userId,
			type,
			indictedType,
			indictedId,
			reportDetails
		},
		order: [ [ 'createdAt', 'DESC' ]]
		
	});
	// if the report already exists and the admin didn't read it yet
	if(report.length>0)
		if(report[0].dataValues.read == false){
			console.log("you already had reported this \n wait till the admin read it");
			return res.redirect("/");
		}
	// adding the report
	await Report.create({userId,type,indictedType,indictedId,reportDetails});
	console.log("report added");
	res.redirect("/");
	}catch (err){
		console.log(err);
		res.redirect("404");
	}

};