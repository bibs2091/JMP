const Report = require("../../models/Report");
const User = require("../../models/Users"); 
module.exports = async (req, res) => {
	var reports = await Report.findAll({
		order: [ [ 'createdAt', 'DESC' ]]
	});
	for(let i=0;i<reports.length;i++){
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