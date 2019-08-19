const express = require("express");
const router = express.Router();

//require controllers 
const reportAddController = require('../controllers/report/add.js');
const reportDetailsController = require('../controllers/report/details');
//handling requests
router.post("/add/:id/:type", reportAddController);
router.get("/add/:id", (req, res) => {
	res.render("404");
});

router.get('/details/:id', reportDetailsController);





module.exports = router;


