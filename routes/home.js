const express = require("express");
const router = express.Router();

//require controllers 
const homeController = require("../controllers/home");


router.get("/", (req, res) => {
	console.log(req.session);
	res.render("index");
});

router.get("/home", (req, res) => {
	res.redirect("/");
});

module.exports = router;
