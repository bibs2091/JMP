const express = require("express");
const router = express.Router();

//require controllers
const homeController = require("../controllers/coach/home");
const editProfileController = require("../controllers/coach/profile");
const myCoursesController = require("../controllers/coach/mycourses");
const myEventsController = require("../controllers/coach/myevents");

//require middleware
const isAuth = require("../middleware/isAuthenticated");
const isCoach = require("../middleware/isCoach");

//handling requests 
router.get("/home", isAuth, isCoach, homeController);
router.get("/editprofile", isAuth, isCoach, editProfileController);
router.get("/mycourses", isAuth, isCoach, myCoursesController);
router.get("/myevents", isAuth, isCoach, myEventsController);

module.exports = router;
