const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get(
	"/test",
	passport.authenticate("local", {
		failureRedirect: "/auth/login",
		successRedirect: "/",
	}),
	(req, res) => {
		res.json({ msg: "this is test for profiles" });
	}
);

module.exports = router;
