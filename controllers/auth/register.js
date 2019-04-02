const bcrypt = require("bcryptjs");
const User = require("../../models/Users");

module.exports = (req, res) => {
	
	// getting the user info from request body
	const email = req.body.email;
	const password = req.body.password;
	const password_conf = req.body.password_conf;

	// validating the info
	req.checkBody('email','Email is required').notEmpty();
	req.checkBody('email','Email is not valid').isEmail();
	req.checkBody('password','Password is required').notEmpty();
	req.checkBody('password_conf','Passwords does not match').equals(req.body.password);

	const errors = req.validationErrors();

	if(errors){
		res.send(errors);
	} else {
		let newUser = {
			email,
			password
		};

		bcrypt.genSalt(10,(err,salt)=>{
			bcrypt.hash(newUser.password,salt,(err,hash)=>{
				if(err) {
					console.log("err1:"+err);
				} else {
					newUser.password = hash;
					User.create(newUser)
					.then( ()=> {
						req.flash('success , You now registred and can login');
						res.redirect("../login");
					})
					.catch(err => console.log('err2:'+err));

				}
			});
		});
	};

};