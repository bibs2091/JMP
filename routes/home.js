const express = require("express");
const router = express.Router();

//require controllers 
const homeController = require("../controllers/home");
const userProfileController = require("../controllers/userProfile");
const coachProfileController = require("../controllers/coachProfile");
const getCurrentUser = require("../controllers/getCurrentUser");
const techReportController = require("../controllers/techReport");

//handling requests
router.get("/", homeController);

router.get("/home", (req, res) => {
	res.redirect("/");
});

router.get("/profile/:id", userProfileController);
// router.get("/profile/:id", coachProfileController);

router.get("/getuser", getCurrentUser);
router.post("/report/tech", techReportController);

router.get("/404", (req, res) => {
	res.render("404");
});

module.exports = router;
