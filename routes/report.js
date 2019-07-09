const express = require("express");
const router = express.Router();

//require controllers 
const reportAddController = require('../controllers/report/add.js');
//handling requests
router.post("add/", reportAddController);
router.get("add/:id",(req, res) => {
	res.render("404");
});







module.exports = router;


