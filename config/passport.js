const LocalStrategy = require("passport-local").Strategy;
const brcrypt = require("bcryptjs");
const passport = require("passport");
//will put the id in the cookie
passport.serializeUser((user, done) => {
	done(null, user.id);
});

//search for the user using the id served by the cookie
passport.deserializeUser((id, done) => {
	// search for user , this will return a promise
	// FIXME:
	done(null, user);
});

passport.use(
	new LocalStrategy((email, password, done) => {
		//search for a user with the email
		// FIXME:
		//test
		const user = {
			name: "brah",
			id: 1,
			email: "brah@gmail.com",
			password: "pw",
		};
		if (!user) {
			return done(null, false, { message: "Wrong credentials" });
		}
		if (user) {
			brcrypt.compare(password, user.password).then(isMatch => {
				if (!isMatch) {
					return done(null, false, { message: "Wrong credentials" });
				} else {
					return done(null, user);
				}
			});
		}
	})
);
