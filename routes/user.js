const express = require("express");
const router = express.Router();

const passport = require("../config/passport");

//require controllers
const homeController = require("../controllers/user/home");
const editProfileController = require("../controllers/user/profile");

//middleware for authentication
const isAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		next();
	} else {
		return res.send("unauthorized", 401);
	}
};

//handling requests
router.get("/home", homeController);
router.get("/editprofile", editProfileController); // FIXME: add isAuth middleware

module.exports = router;
