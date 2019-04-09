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
		failureRedirect: "/auth/login",
		failureFlash: true,
	}),
	(req, res) => {
		return res.redirect("/home");
	}
);

router.get("/logout", (req, res) => {});

router.get("/register", (req, res) => {
	res.send("register page");
});

router.post("/register", (req, res) => {});

module.exports = router;
