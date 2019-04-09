const express = require("express");
const router = express.Router();
const passport = require("../config/passport");

//handling requests
router.get("/login", (req, res) => {
	res.render("login");
	console.log("inside get login");
});

router.post(
	"/login",
	passport.authenticate("local", {
		successRedirect: "/home",
		failureRedirect: "/auth/login",
		failureFlash: true,
	})
);

const isAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		next();
	} else {
		return res.send("unauthorized", 401);
	}
};

router.get("/logout", (req, res, next) => {
	if (req.session) {
		req.logOut();
		res.clearCookie("connect.sid", { path: "/" });
		req.session.destroy(err => {
			if (err) {
				next(err);
			} else {
				return res.redirect("/");
			}
		});
	}
});

router.get("/register", (req, res) => {
	res.send("register page");
});

router.post("/register", (req, res) => {});

module.exports = router;
