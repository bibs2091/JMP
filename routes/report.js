const express = require("express");
const router = express.Router();

//require controllers 
const reportAddController = require('../controllers/report/add.js');
const reportDetailsController = require('../controllers/report/details');
const deleteReportController = require("../controllers/report/delete");

//require middelware
const isAuthenticated = require("../middleware/isAuthenticated");
//handling requests
router.post("/add/:id/:type", reportAddController);
router.get("/add/:id", (req, res) => {
	res.render("404");
});

router.get('/details/:id', reportDetailsController);
router.delete("/delete/:id", isAuthenticated, deleteReportController);




module.exports = router;


