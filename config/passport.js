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
	new LocalStrategy(
		{
			passReqToCallback: true,
			usernameField: "email",
		},
		(req, email, password, done) => {
			//search for a user with the email
			User.findOne({
				where: { email },
			})
				.then(user => {
					if (!user) {
						return done(
							null,
							false,
							req.flash("loginMessage", "Wrong credentials")
						);
					}

					if (user) {
						brcrypt
							.compare(password, user.password)
							.then(isMatch => {
								if (!isMatch) {
									return done(
										null,
										false,
										req.flash(
											"loginMessage",
											"Wrong credentials"
										)
									);
								} else {
									if (user.groupId != 3) {
										return done(null, user);
									}
									return done(
										null,
										false,
										req.flash(
											"loginMessage",
											"Your account hasn't been validated yet"
										)
									);
								}
							});
					}
				})
				.catch(err => {
					return done(null, false, {
						message: "An error has occured, try again",
					});
				});
		}
	)
);

module.exports = passport;
