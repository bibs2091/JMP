const express = require("express");
const router = express.Router();

//require controllers
const homeController = require("../controllers/user/home");
const editProfileController = require("../controllers/user/profile");


//handling requests 
router.get("/home", homeController);
router.get("/editprofile", editProfileController);

module.exports = router;
