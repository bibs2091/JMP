const express = require("express");
const router = express.Router();
const passport = require("../config/passport");
const registerController = require("../controllers/auth/register");

//middleware for authentication
const isAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		next();
	} else {
		return res.send("unauthorized", 401);
	}
};

//handling requests
router.get("/login", (req, res) => {
	res.render("auth.login", { error: req.flash("loginMessage")[0] });
});

router.post(
	"/login",
	passport.authenticate("local", {
		failureRedirect: "/auth/login",
		failureFlash: true,
	}),
	(req, res) => {
		if ((req.body.rememberMe = "on")) {
			req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 30; // one month
		} else {
			req.session.cookie.expires = false; // cookie exprires at the end of the sess
		}
		res.redirect("/home");
	}
);

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
	res.render("auth.register");
});

router.post("/register",  registerController);


// for development :
router.get("/postregister",(req,res)=>{
	res.render("auth.after_register")
})

module.exports = router;
