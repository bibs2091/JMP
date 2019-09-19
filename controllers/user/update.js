const UsersInfo = require("../../models/UsersInfo");
const Users = require("../../models/Users");
const brcrypt = require("bcryptjs");
module.exports = async (req, res) => {
	try{
		let userInfo = await UsersInfo.findOne({ where: { userId: req.user.id } });
    	let user = await Users.findOne({where :  {id : req.user.id}});
		var currentUser = req.user;
    	currentUser.info = userInfo.dataValues;
		if(req.params.id == 1){
			var avatar = null;
			if (req.files)
    			avatar = req.files.avatar;
    		console.log(avatar);
    		const {firstName,lastName,number,bio} = req.body;
    		const skillsJSON = req.body.skillsJSON;
    		var skills ="";
			var skillsJS="";
			if (skillsJSON.length)
				skillsJS = JSON.parse(skillsJSON);
			else
				skillsJS = [];
			for (let i=0;i<skillsJS.length;i++){
				skills += "||"+skillsJS[i];
			}
			skills = skills.substring(2,skills.length);
			userInfo = await UsersInfo.update(
				{
					firstName,
					lastName,
					bio,
					number,
					skills
				},
				{where:{
					userId:req.user.id
				}
			}
			);
			if (avatar){
				await UsersInfo.update(
				{
					avatar:"/img/avatars/"+req.user.id+".jpg"
				},
				{where:{
					userId:req.user.id
				}
			});
				await avatar.mv(__dirname + '/../../public/img/avatars/' + req.user.id + ".jpg");
				console.log("here");
			}
			    return res.redirect("/user/settings");
		}else if (req.params.id == 2){
			await UsersInfo.update(req.body,{where :{userId:req.user.id}});
			return res.redirect("/user/settings");
		}else if(req.params.id == 3){
			userInfo.skills = userInfo.skills.split('||');
			const {oldpass,newpass,newpassconfirm} = req.body;
			
			brcrypt
							.compare(oldpass, user.password)
							.then(isMatch => {
								if (!isMatch) {
									return res.render("user.editProfile",{
										pageTitle: "Profile settings",
								        pageName: "Profile Settings",
								        currentUser,
								        userInfo,
								        user,
								        messages : "Your password is incorrect"
								        });
									
								} else {
									if (newpass.length<8 || newpass.length>30){
										return res.render("user.editProfile",{
										pageTitle: "Profile settings",
								        pageName: "Profile Settings",
								        currentUser,
								        userInfo,
								        user,
								        messages : "New password must be between 8 and 30 characters long"
								        });
										}

									else if (newpass != newpassconfirm){
										return res.render("user.editProfile",{
										pageTitle: "Profile settings",
								        pageName: "Profile Settings",
								        currentUser,
								        userInfo,
								        user,
								        messages : "New passwords does not match"
								        });
									}
									else {
										// hashing the password before storing it
									brcrypt.genSalt(10, (err, salt) => {
										if (err) {
											console.log("error :" + err);
											return res.redirect('404');
										}
										brcrypt.hash(newpass, salt, async (err, hash) => {
											if (err) {
												console.log("error :" + err);
												return res.redirect('404');
											} else {
												var pass = hash;
												user = await Users.update({
													email,
													password :pass

												},
													{where :{id:req.user.id} }
													);
											}
										});
									});

									return res.render("user.editProfile",{
										pageTitle: "Profile settings",
								        pageName: "Profile Settings",
								        currentUser,
								        userInfo,
								        user,
								        messages : "password had been changed"
								        });
									}
								}
	});
}

	}catch(err){
		console.log(err);
		res.redirect('404');
	}
}