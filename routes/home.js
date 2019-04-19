const express = require("express");
const router = express.Router();

//require controllers 
const homeController = require("../controllers/home");
const userProfileController = require("../controllers/userProfile");
const coachProfileController = require("../controllers/coachProfile");

//handling requests
router.get("/", homeController);

router.get("/home", (req, res) => {
	res.redirect("/");
});

router.get("/profile/user/:id", userProfileController);
router.get("/profile/coach/:id", coachProfileController);

module.exports = router;
