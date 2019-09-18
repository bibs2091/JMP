const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

//require controllers 
const homeController = require("../controllers/home");
const userProfileController = require("../controllers/userProfile");
const getCurrentUser = require("../controllers/getCurrentUser");
const techReportController = require("../controllers/techReport");
const donateController = require("../controllers/donate");
const searchController = require("../controllers/search");


//require middleware
const homeRedirect = require("../middleware/homeRedirect");

//handling requests
router.get("/", homeRedirect, homeController);
router.get("/search", searchController);
router.get("/home", (req, res) => {
	res.redirect("/");
});

router.get("/profile/:id", userProfileController);

router.get("/getuser", getCurrentUser);
router.post("/report/tech", techReportController);
router.post("/donate", donateController);

router.get("/404", (req, res) => {
	res.render("404");
});

module.exports = router;
