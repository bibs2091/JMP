const express = require("express");
const router = express.Router();

//require controllers
const homeController = require("../controllers/user/home");
const profileController = require("../controllers/user/profile");


//handling requests 
router.get("/home", homeController);
router.get("/profile", profileController);

module.exports = router;
