const express = require("express");
const router = express.Router();

//require controllers
const homeController = require("../controllers/admin/home");

//handling requests 
router.get("/home", homeController);

module.exports = router;
