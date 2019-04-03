const express = require("express");
const router = express.Router();
const passport = require("passport");

//require controllers
const loginController = require("../controllers/auth/login");
const registerController = require("../controllers/auth/register");
const logoutController = require("../controllers/auth/logout");

//handling requests
router.get("/login", (req, res) => {
	res.render("login");
	console.log("inside get login");
	console.log(req.sessionID);
});

router.post("/login", loginController);

router.get("/logout", logoutController);

router.get("/register", (req, res) => {
	res.send("register page");
});

router.post("/register", registerController);

module.exports = router;
