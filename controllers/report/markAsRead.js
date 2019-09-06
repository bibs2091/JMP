const Report = require("../../models/Report");
module.exports = async (req, res) => {
	try{
		Report.update(
		{
			read:"true"
		},
		{where
			:{id:req.params.id}
		});
		res.send({ success: true });
	}catch (err){
		console.log(err);
		res.redirect("404");
	}
};