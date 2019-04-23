const bcrypt = require("bcryptjs");
const User = require("../../models/Users");
const UserInfo = require("../../models/UsersInfo");
const db = require("../../config/database");

db.sync({ forced: true });
module.exports = async (req, res) => {
	try {
		// getting the user info from request body
		const email = req.body.email.toLowerCase();
		const password = req.body.password;
		const password_conf = req.body.password_conf;
		const firstName = req.body.firstName;
		const lastName = req.body.lastName;
		const username = req.body.userName;
		const phone = req.body.phoneNumber;

		// validating the info
		let validationErrors = [];
		req.checkBody("email", "Email is not valid")
			.notEmpty()
			.isEmail();
		req.checkBody("userName", "Username is required").notEmpty();

		// if the email or userName is valide
		if (req.validationErrors().length == 1 || !req.validationErrors()) {
			//cheking if email and userName are unique
			let user = User.findOne({
				where: {
					email: email,
				},
			});
			let userInfo = UserInfo.findOne({
				where: {
					username: username,
				},
			});
			[user, userInfo] = await Promise.all([user, userInfo]);
			// if email is already used
			if (user) {
				validationErrors.push({
					location: "body",
					param: "email",
					msg: "Email already in use",
				});
			}
			// if userName is already used
			if (userInfo) {
				validationErrors.push({
					location: "body",
					param: "userName",
					msg: "Username already in use",
				});
			}
		}

		req.checkBody("password")
			.isLength({ min: 8 })
			.withMessage("Password must be at least 8 characters long")
			.isLength({ max: 30 })
			.withMessage("Password must not contain more then 30 characters");

		req.checkBody("password_conf", "Passwords does not match").equals(
			req.body.password
		);
		const errors = req.validationErrors();
		// if there is some  inpute errors add them to validationErrors
		if (errors) {
			errors.forEach(err => {
				validationErrors.push(err);
			});
		}
		//if there is errors render the rgistration page with errors
		if (validationErrors.length > 0) {
			console.log(validationErrors);
			res.render("auth.register", {
				errors: validationErrors,
			});
		} else {
			//creating the user + userinfo
			let newUser = {
				email,
				password,
			};
			let newUserInfo = { firstName, lastName, username, phone };

			// hashing the password before storing it
			bcrypt.genSalt(10, (err, salt) => {
				if (err) {
					console.log("error :" + err);
				}
				bcrypt.hash(newUser.password, salt, async (err, hash) => {
					if (err) {
						console.log("error :" + err);
					} else {
						newUser.password = hash;
						user = await User.create(newUser);
						newUserInfo.userId = user.id;
						await UserInfo.create(newUserInfo);
						//flashing a success msg for later use
						req.flash(
							"success",
							" You now registred and can login"
						);
						//mba3da nriglouha
						res.render("auth.after_register");
					}
				});
			});
		}
	} catch (err) {
		console.log(err);
		res.render("auth.register", {
			errors: [{ msg: "An error had occurred" }],
		});
	}
};
