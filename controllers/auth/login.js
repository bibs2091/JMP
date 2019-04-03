const passport = require("passport");

module.exports = (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
		req.login(user, err => {
			return res.send("authenticated");
		});
	})(req, res, next);
};
