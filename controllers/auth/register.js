const bcrypt = require("bcryptjs");
const User = require("../../models/Users");
const UserInfo = require("../../models/UsersInfo");
module.exports = (req, res) => {
	
	// getting the user info from request body
	const email = req.body.email;
	const password = req.body.password;
	const password_conf = req.body.password_conf;
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const userName = req.body.userName;
	const numTéléphone = req.body.numTéléphone;
	const avatar = req.body.avatar;
	const bio = req.body.bio;
	let skills = req.body.skills;
	const lien_fcb = req.body.lien_fcb;
	const lien_insta = req.body.lien_insta;
	const lien_twitter = req.body.lien_twitter;
	const lien_github = req.body.lien_github;
	
	//making skills lower case
	if (skills){

		skills = skills.toLowerCase().replace(/, /g, ',');
	}

	// validating the info
	
	req.checkBody('email',"Email is required").notEmpty();
	req.checkBody('email','Email is not valid').isEmail();
	req.checkBody('password','Password is required').notEmpty();
	req.checkBody('password_conf','Passwords does not match').equals(req.body.password);
	req.checkBody('userName','userName is required').notEmpty();

	const errors = req.validationErrors();

	if(errors){
		//res.render('/',{
			//errors
			//});
		res.send(errors);
	} else {
		let newUser = {
			email,
			password
		};
		let newUserInfo= {firstName,lastName,userName,numTéléphone,avatar,bio,skills,lien_fcb,lien_insta,lien_twitter,lien_github};


		bcrypt.genSalt(10,(err,salt)=>{
			bcrypt.hash(newUser.password,salt,(err,hash)=>{
				if(err) {
					console.log("err1:"+err);
				} else {
					newUser.password = hash;
					User.create(newUser)
					.then( user=> {
						newUserInfo.userId =user.id; 
						UserInfo.create(newUserInfo)
						.then(()=>{
							req.flash('success , You now registred and can login');
							res.redirect("../login");		
						})
						.catch(err => console.log('err2:'+err))
					})
					.catch(err => console.log('err3:'+err));

				}
			});
		});
	};

};