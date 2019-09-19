const Users = require("../../models/Users");
const bcrypt = require("bcryptjs");
module.exports = async (req, res) => {
	try {
		const {id,newpass} = req.params;
		var user = await Users.findOne({where :{id}});
		if(!user){
			return res.redirect("/");
		}
		bcrypt.genSalt(10, (err, salt) => {
				if (err) {
					return console.log("error :" + err);
				}
				bcrypt.hash(newpass, salt, async (err, hash) => {
					if (err) {
						return console.log("error :" + err);
					} else {
						 await Users.update({password :hash},{where : {id}});
						}
				});
			});
		return res.redirect('/');
} catch (err) {
		console.log(err);
		res.render("/");
	}
};