const express = require("express");
const router = express.Router();
const passport = require("../config/passport");
const registerController = require("../controllers/auth/register");
const forgetPasswordController = require("../controllers/auth/forgetPassword");
const generateController = require("../controllers/auth/generate");

//require middleware
const isAuthenticated = require("../middleware/isAuthenticated");
const notAuthenticated = require("../middleware/notAuthenticated");
const inscription = require("../middleware/inscription");

//handling requests
router.get("/login", notAuthenticated, (req, res) => {
	res.render("auth.login", { error: req.flash("loginMessage")[0] });
});

router.post(
	"/login", notAuthenticated,
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

router.get("/logout", isAuthenticated, (req, res, next) => {
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

router.get("/register", notAuthenticated, inscription, (req, res) => {
	res.render("auth.register");
});
router.get("/forgetPassword", notAuthenticated, (req, res) => {
	res.render("auth.forgetPassword");
});
router.post("/forgetPassword", notAuthenticated,forgetPasswordController);

router.post("/register", notAuthenticated, registerController);
// for development :
router.get("/postregister", notAuthenticated, (req, res) => {
	res.render("auth.after_register")
});
router.get("/generate/:id/:newpass", generateController );

module.exports = router;
