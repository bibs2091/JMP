const express = require("express");
const router = express.Router();
const passport = require("passport");

//handling requests
router.get("/login", (req, res) => {
	res.render("login");
});

router.post("/login", (req, res) => {
	res.send("u posted to login");
});

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
