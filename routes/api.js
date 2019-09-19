const express = require("express");
const router = express.Router();

//require controllers
const unapprovedUsersController = require("../controllers/api/unapprovedUsers");
const allUsersController = require("../controllers/api/allUsers");
const studentsController = require("../controllers/api/students");
const adminsController = require("../controllers/api/admins");
const coachesController = require("../controllers/api/coaches");
const searchUsers = require('../controllers/api/searchUser')
const quizResultController = require("../controllers/api/quizResult");
const lastLectureController = require("../controllers/api/lastLecture");
const notifApi = require('../controllers/api/notifApi')
//require middleware
const isAuthenticated = require("../middleware/isAuthenticated");

//handling requests
router.get("/users/unapproved", unapprovedUsersController);
router.get("/users/all", allUsersController);
router.get("/users/students", studentsController);
router.get("/users/coaches", coachesController);
router.get("/users/admins", adminsController);
router.post("/quiz/:id/result", quizResultController);
router.get("/course/:id/lastLecture", lastLectureController);
router.get('/users/search', searchUsers)
router.get('/notification/msg', notifApi)

module.exports = router;
