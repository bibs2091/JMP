const LocalStrategy = require("passport-local").Strategy;
const brcrypt = require("bcryptjs");
const passport = require("passport");

const User = require("../models/Users");

//will put the id in the cookie
passport.serializeUser((user, done) => {
	done(null, user.id);
});

//search for the user using the id served by the cookie
passport.deserializeUser((id, done) => {
	User.findByPk(id).then(user => {
		done(null, user);
	});
});

passport.use(
	new LocalStrategy((email, password, done) => {
		//search for a user with the email

		console.log("this is the email " + email);
		console.log("this is the password " + password);

		User.findOne({
			where: { email },
		})
			.then(user => {
				if (!user) {
					return done(null, false, { message: "Wrong credentials" });
				}

				// if (user) {
				// 	brcrypt.compare(password, user.password).then(isMatch => {
				// 		if (!isMatch) {
				// 			return done(null, false, {
				// 				message: "Wrong credentials",
				// 			});
				// 		} else {
				// 			return done(null, user);
				// 		}
				// 	});
				// }

				//test
				if (user) {
					if (password === user.password) {
						return done(null, user);
					}
				}
			})
			.catch(err => {
				console.log(err);
				return done(null, false, { message: "error" });
			});
	})
);

module.exports = passport;
