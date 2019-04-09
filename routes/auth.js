const express = require("express");
const router = express.Router();
const passport = require("../config/passport");

//handling requests
router.get("/login", (req, res) => {
	res.render("login");
});

router.post(
	"/login",
	passport.authenticate("local", {
		failureRedirect: "/auth/login",
		failureFlash: true,
	}),
	(req, res) => {
		return res.redirect("/home");
	}
);

router.get("/logout", (req, res) => {
	res.send("this is logout");
});

router.get("/register", (req, res) => {
	res.send("register page");
});

router.post("/register", (req, res) => {
	res.send("u posted to register");
});

module.exports = router;
