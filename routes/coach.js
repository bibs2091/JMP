const express = require("express");
const router = express.Router();

//require controllers
const homeController = require("../controllers/coach/home");
const editProfileController = require("../controllers/coach/profile");
const myCoursesController = require("../controllers/coach/mycourses");

//handling requests 
router.get("/home", homeController);
router.get("/editprofile", editProfileController);
router.get("/mycourses", myCoursesController);

module.exports = router;
