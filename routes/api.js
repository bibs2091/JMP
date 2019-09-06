const express = require("express");
const router = express.Router();

//require controllers
const unapprovedUsersController = require("../controllers/api/unapprovedUsers");
const allUsersController = require("../controllers/api/allUsers");
const searchUsers = require('../controllers/api/searchUser')
const quizResultController = require("../controllers/api/quizResult");
const lastLectureController = require("../controllers/api/lastLecture");

//require middleware
const isAuthenticated = require("../middleware/isAuthenticated");

//handling requests
router.get("/users/unapproved", unapprovedUsersController);
router.get("/users/all", allUsersController);
router.post("/quiz/:id/result", quizResultController);
router.get("/course/:id/lastLecture", lastLectureController);
router.get('/users/search', searchUsers)


module.exports = router;
