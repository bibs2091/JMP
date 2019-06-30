const Report = require("../../models/Report");
module.exports = async (req, res) => {
	try{
		//getting the report data
	let {userId,indictedType,indictedId} = req.body;

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
	if (report){
		if(!report.read){
			console.log("you already had reported this \n wait till the admin read it");
			return res.render("404");
		}
			
	}
	// adding the report
	await Report.create({userId,type,indictedType,indictedId,reportDetails});
	console.log("report added");
	res.render("404");
	console.log('Works!!');
	}catch (err){
		console.log(err);
		res.redirect("404");
	}

};