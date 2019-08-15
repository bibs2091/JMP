const express = require("express");
const router = express.Router();

//require controllers
const unapprovedUsersController = require("../controllers/api/unapprovedUsers");
const allUsersController = require("../controllers/api/allUsers");
const quizResultController = require("../controllers/api/quizResult");

//require middleware
const isAuthenticated = require("../middleware/isAuthenticated");

//handling requests
router.get("/users/unapproved", unapprovedUsersController);
router.get("/users/all", allUsersController);
router.post("/quiz/:id/result", quizResultController);

module.exports = router;
