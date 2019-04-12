const express = require("express");
const router = express.Router();

//require controllers 
const homeController = require("../controllers/home");
const courseDetailsController = require("../controllers/courseDetails");

router.get("/", homeController);

router.get("/home", (req, res) => {
	res.redirect("/");
});

router.get("/course/:id", courseDetailsController);

module.exports = router;
