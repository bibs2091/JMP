const Report = require("../../models/Report");
const User = require("../../models/Users"); 
module.exports = async (req, res) => {
	const reports = await Report.findAll({
		where:{
			read :false
		},
		order: [ [ 'createdAt', 'DESC' ]]
		
	});
	//const user
    res.render("admin.reportCenter", {
    	reports,
        pageName: "Reports Center",
        pageTitle: "Dashboard - Reports Center"
    });
}